import { connect, ChannelModel } from 'amqplib'

import { env } from '@app/env'

export class RabbitMQClient {
	private static CONNECTION: ChannelModel | null = null

	static async getConnection(): Promise<ChannelModel> {
		if (!RabbitMQClient.CONNECTION) {
			RabbitMQClient.CONNECTION = await connect({
				hostname: env.RABBITMQ_URL,
				username: env.RABBITMQ_USER,
				password: env.RABBITMQ_PASSWORD
			})
		}

		return RabbitMQClient.CONNECTION
	}
}
