import { AppError } from '@app/shared/AppErrors'
import { RabbitMQClient } from '@microservice/shared/RabbitMQClient'

import type { QueueConsumer, QueueConsumerProps } from '@ports/QueueConsumer'

export class RabbitMqQueueConsumer implements QueueConsumer {
	async listen({
		queueName,
		handler,
		toReply,
	}: QueueConsumerProps): Promise<any> {
		const rabbitMqConnection = await RabbitMQClient.getConnection()

		const channel = await rabbitMqConnection.createChannel()

		await channel.assertQueue(queueName, { durable: true })

		channel.consume(queueName, async (message) => {
			if (!message) {
				return null
			}

			const body = JSON.parse(message.content.toString())

			let correlationId: string | null = null
			let replyTo: string | null = null

			try {
				replyTo = message.properties.replyTo as string
				correlationId = message.properties.correlationId as string

				const response = await handler(body)

				if (toReply) {
					const result = {
						data: response,
						success: true,
					}

					// Envia a reposta para a fila de resposta com o mesmo correlationId
					channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), {
						correlationId,
					})
				}

				channel.ack(message)
			} catch (error: unknown) {
				console.error(`Error handling message from ${queueName}:`, error)

				console.log({
					correlationId,
					replyTo,
				})

				if (toReply && correlationId && replyTo) {
					const messageError =
						error instanceof AppError
							? error.message
							: 'An unexpected mistake occurred!'

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
					)
				}

				channel.ack(message)
			}
		})

		console.info(`Listening to queue: ${queueName} ....`)
	}
}
