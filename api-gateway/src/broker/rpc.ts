/** biome-ignore-all lint/suspicious/noAsyncPromiseExecutor: <explanation> */
import type { Channel } from "amqplib";

export async function rpcCall(
	channel: Channel,
	replyQueueName: string,
	correlationId: string,
) {
	// Criando a fila de resposta
	await channel.assertQueue(replyQueueName, { exclusive: true });

	return new Promise(async (resolve) => {
		const consumer = await channel.consume(
			replyQueueName,
			(message) => {
				if (message?.properties.correlationId === correlationId) {
					resolve(JSON.parse(message.content.toString()));

					channel.cancel(consumer.consumerTag);
				}
			},
			{
				noAck: true,
			},
		);
	});
}
