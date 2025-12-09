import { env } from '@app/env'
import { type ChannelModel, connect } from 'amqplib'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RabbitMQClient {
	private static CONNECTION: ChannelModel | null = null

	static async getConnection(): Promise<ChannelModel> {
		if (!RabbitMQClient.CONNECTION) {
			RabbitMQClient.CONNECTION = await connect({
				hostname: env.RABBITMQ_URL,
				username: env.RABBITMQ_USER,
				password: env.RABBITMQ_PASSWORD,
			})
		}

		return RabbitMQClient.CONNECTION
	}
}
