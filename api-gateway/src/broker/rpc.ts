/** biome-ignore-all lint/suspicious/noAsyncPromiseExecutor: <explanation> */
import { randomUUID } from "node:crypto";

import type { Channel } from "amqplib";

import { RpcCallErrors } from "../errors/RpcCallErrors.ts";

export async function rpcCall(
	channel: Channel,
	queueName: string,
	message: any,
	timeoutMs: number = 30000, // 30 seconds
) {
	const correlationId = randomUUID();

	return new Promise(async (resolve, reject) => {
		let consumerTag: string | null = null;
		let isResolved: boolean = false;

		const replyQueue = await channel.assertQueue("", {
			exclusive: true,
			autoDelete: true,
		});

		const replyQueueName = replyQueue.queue;

		const timeout = setTimeout(() => {
			if (isResolved) {
				return;
			}

			isResolved = true;

			if (consumerTag) {
				channel.cancel(consumerTag).catch(console.error);
			}

			channel.deleteQueue(replyQueueName).catch(console.error);

			reject(new Error("RPC call timed out!"));
		}, timeoutMs);

		try {
			const consumerResponse = await channel.consume(
				replyQueueName,
				(msg) => {
					if (!msg || isResolved) {
						return;
					}

					if (msg.properties.correlationId === correlationId) {
						isResolved = true;

						clearTimeout(timeout);

						try {
							const content = msg.content.toString();
							const parsedContent = JSON.parse(content) as {
								success: boolean;
								message?: string;
								data?: any;
							};

							console.log(`[RPC] Response received:`, parsedContent);

							if (consumerTag) {
								channel.cancel(consumerTag).catch(console.error);
							}

							channel.deleteQueue(replyQueueName).catch(console.error);

							if (!parsedContent.success) {
								const messageContent = parsedContent.message as string;

								reject(new RpcCallErrors(messageContent));
							}

							resolve(parsedContent);
						} catch (error) {
							reject(new Error(`Failed to RPC response: ${error}`));
						}
					}
				},
				{
					noAck: true,
				},
			);

			consumerTag = consumerResponse.consumerTag;

			channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
				correlationId,
				replyTo: replyQueueName,
				persistent: true,
			});
		} catch (error) {
			clearTimeout(timeout);

			if (consumerTag) {
				channel.cancel(consumerTag).catch(console.error);
			}

			channel.deleteQueue(replyQueueName).catch(console.error);

			reject(error);
		}
	});
}
