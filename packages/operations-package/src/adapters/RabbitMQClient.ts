/** biome-ignore-all lint/suspicious/noAsyncPromiseExecutor: <explanation> */
import { randomUUID } from "node:crypto";
import { type Channel, type ChannelModel, connect } from "amqplib";
import type { ContentRpcMessage } from "../ports/ContentRpcMessage";
import type { QueueConsumerProps } from "../ports/QueueConsumerProps";
import type { RabbitMQClientPort } from "../ports/RabbitMQClientPort";
import { AppError } from "../shared/AppErrors";
import type { RabbitMQConfig } from "../shared/interfaces/RabbitMQConfig";
import { RpcCallErrors } from "../shared/RpcCallErrors";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RabbitMQClient implements RabbitMQClientPort {
	private CONNECTION: ChannelModel | null = null;
	private config: RabbitMQConfig;
	private channels: Map<string, Channel> = new Map();

	constructor(config: RabbitMQConfig) {
		this.config = config;
	}

	async getConnection(): Promise<ChannelModel> {
		if (!this.CONNECTION) {
			this.CONNECTION = await connect({
				hostname: this.config.hostname,
				username: this.config.username,
				password: this.config.password,
			});
		}

		return this.CONNECTION;
	}

	async registerChannel(channelName: string): Promise<void> {
		if (this.channels.has(channelName)) {
			return;
		}

		if (!this.CONNECTION) {
			await this.getConnection();
		}

		const channel = await this.CONNECTION!.createChannel();

		this.channels.set(channelName, channel);
	}

	async listen({
		queueName,
		handler,
		toReply,
	}: QueueConsumerProps): Promise<any> {
		const rabbitMqConnection = await this.getConnection();

		const channel = await rabbitMqConnection.createChannel();

		await channel.assertQueue(queueName, { durable: true });

		channel.consume(queueName, async (message) => {
			if (!message) {
				return null;
			}

			const body = JSON.parse(message.content.toString());

			let correlationId: string | null = null;
			let replyTo: string | null = null;

			try {
				replyTo = message.properties.replyTo as string;
				correlationId = message.properties.correlationId as string;

				const response = await handler(body);

				if (toReply) {
					const result = {
						data: response,
						success: true,
					};

					// Envia a reposta para a fila de resposta com o mesmo correlationId
					channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), {
						correlationId,
					});
				}

				channel.ack(message);
			} catch (error: unknown) {
				console.error(`Error handling message from ${queueName}:`, error);

				if (toReply && correlationId && replyTo) {
					const messageError =
						error instanceof AppError
							? error.message
							: "An unexpected mistake occurred!";

					channel.sendToQueue(
						replyTo,
						Buffer.from(
							JSON.stringify({
								success: false,
								message: messageError,
							}),
						),
						{
							correlationId,
						},
					);
				}

				channel.ack(message);
			}
		});

		console.info(`Listening to queue: ${queueName} ....`);
	}

	async publish(queueName: string, message: unknown): Promise<void> {
		const rabbitMqConnection = await this.getConnection();

		const channel = await rabbitMqConnection.createChannel();

		await channel.assertQueue(queueName);

		channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

		await channel.close();
		await rabbitMqConnection.close();
	}

	async rpcCall(
		queueName: string,
		message: any,
		timeoutMs: number = 30000,
	): Promise<ContentRpcMessage> {
		const channel = this.channels.get(queueName);

		if (!channel) {
			throw new Error(`Channel ${queueName} not registered.`);
		}

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
								const parsedContent = JSON.parse(content) as ContentRpcMessage;

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
}
