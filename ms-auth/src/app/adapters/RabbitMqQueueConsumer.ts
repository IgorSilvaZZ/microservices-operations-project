import { RabbitMQClient } from "@microservice/shared/RabbitMQClient";

import type { QueueConsumer, QueueConsumerProps } from "@ports/QueueConsumer";

export class RabbitMqQueueConsumer implements QueueConsumer {
	async listen({
		queueName,
		handler,
		toReply,
	}: QueueConsumerProps): Promise<any> {
		const rabbitMqConnection = await RabbitMQClient.getConnection();

		const channel = await rabbitMqConnection.createChannel();

		await channel.assertQueue(queueName);

		channel.consume(queueName, async (message) => {
			if (!message) {
				return null;
			}

			const body = JSON.parse(message.content.toString());

			try {
				const result = await handler(body);

				if (toReply !== undefined && toReply === true) {
					const replyTo = message.properties.replyTo;
					const correlationId = message.properties.correlationId;

					// Envia a reposta para a fila de resposta com o mesmo correlationId
					channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), {
						correlationId,
					});
				}

				channel.ack(message);
			} catch (error) {
				console.error(`Error handling message from ${queueName}:`, error);

				channel.nack(message, false, false);
			} finally {
				await rabbitMqConnection.close();
			}
		});

		console.info(`Listening to queue: ${queueName} ....`);
	}
}
