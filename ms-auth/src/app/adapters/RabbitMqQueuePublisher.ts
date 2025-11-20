import { RabbitMQClient } from "@microservice/shared/RabbitMQClient";

import type { QueuePublisher } from "@ports/QueuePublisher";

export class RabbitMqQueuePublisher implements QueuePublisher {
	async publish(queueName: string, message: unknown): Promise<void> {
		const rabbitMqConnection = await RabbitMQClient.getConnection();

		const channel = await rabbitMqConnection.createChannel();

		await channel.assertQueue(queueName);

		channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

		await channel.close();
		await rabbitMqConnection.close();
	}
}
