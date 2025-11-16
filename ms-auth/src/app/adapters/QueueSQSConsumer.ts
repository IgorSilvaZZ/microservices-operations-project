import {
	ReceiveMessageCommand,
	DeleteMessageCommand,
	Message
} from '@aws-sdk/client-sqs'

import { SQSClient } from '@infra/microservice/shared/SQSClient'

import { QueueConsumer } from '@ports/QueueConsumer'

export class QueueSQSConsumer implements QueueConsumer {
	constructor(private sqsClient: SQSClient = SQSClient.getInstance()) {}

	private async deleteMessage(
		queueUrl: string,
		receiptHandle: string
	): Promise<void> {
		try {
			const deleteMessageCommand = new DeleteMessageCommand({
				QueueUrl: queueUrl,
				ReceiptHandle: receiptHandle
			})

			await this.sqsClient.send(deleteMessageCommand)
		} catch (error) {
			console.error('Error deleting message from SQS:', error)
		}
	}

	private async processMessage(
		queueUrl: string,
		message: Message,
		handler: (message: unknown) => Promise<void>
	): Promise<void> {
		const body = message.Body ? JSON.parse(message.Body) : null

		try {
			await handler(body)

			await this.deleteMessage(queueUrl, message.ReceiptHandle!)
		} catch (errorHandler) {
			console.error('Error processing message:', errorHandler)
		}
	}

	async listen(
		queueUrl: string,
		handler: (message: unknown) => Promise<void>
	): Promise<void> {
		try {
			const command = new ReceiveMessageCommand({
				QueueUrl: queueUrl,
				MaxNumberOfMessages: 10,
				WaitTimeSeconds: 20
			})

			const response = await this.sqsClient.send(command)

			if (response.Messages) {
				const messages = response.Messages

				await Promise.all(
					messages.map(async message =>
						this.processMessage(queueUrl, message, handler)
					)
				)
			}
		} catch (error) {
			console.error('Error consuming messages from SQS:', error)
		} finally {
			setImmediate(() => this.listen(queueUrl, handler))
		}
	}
}
