import { QueueConsumer, QueueConsumerProps } from '@ports/QueueConsumer'

import { RabbitMQClient } from '@microservice/shared/RabbitMQClient'

export class RabbitMqQueueConsumer implements QueueConsumer {
	async listen({
		queueName,
		handler,
		toReply
	}: QueueConsumerProps): Promise<any> {
		const rabbitMqConnection = await RabbitMQClient.getConnection()

		const channel = await rabbitMqConnection.createChannel()

		await channel.assertQueue(queueName)

		channel.consume(queueName, async message => {
			if (message) {
				const body = JSON.parse(message.content.toString())

				try {
					const result = await handler(body)

					if (toReply !== undefined && toReply === true) {
						const replyTo = message.properties.replyTo
						const correlationId = message.properties.correlationId

						channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), {
							correlationId
						})
					}

					channel.ack(message)
				} catch (error) {
					console.error(`Error handling message from ${queueName}:`, error)

					channel.nack(message, false, false)
				}
			}
		})

		console.info(`Listening to queue: ${queueName} ....`)
	}
}
