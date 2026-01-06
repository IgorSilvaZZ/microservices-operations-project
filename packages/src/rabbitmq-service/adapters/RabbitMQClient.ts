import { type ChannelModel, connect } from "amqplib";
import type {
	QueueConsumerProps,
	RabbitMQClientPort,
} from "../ports/RabbitMQClientPort";

import { AppError } from "../shared/AppErrors";
import type { RabbitMQConfig } from "../shared/interfaces/RabbitMQConfig";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RabbitMQClient implements RabbitMQClientPort {
	private CONNECTION: ChannelModel | null = null;
	private config: RabbitMQConfig;

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
		throw new Error("Method not implemented.");
	}
}
