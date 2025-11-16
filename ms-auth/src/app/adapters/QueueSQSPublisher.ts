import { SendMessageCommand } from '@aws-sdk/client-sqs'

import { SQSClient } from '@infra/microservice/shared/SQSClient'

import { QueuePublisher } from '@ports/QueuePublisher'

export class QueueSQSPublisher implements QueuePublisher {
	constructor(private sqsClient: SQSClient = SQSClient.getInstance()) {}

	async publish(queueUrl: string, message: unknown): Promise<void> {
		try {
			const command = new SendMessageCommand({
				QueueUrl: queueUrl,
				MessageBody: JSON.stringify(message)
			})

			await this.sqsClient.send(command)
		} catch (error) {
			console.error('Error publishing message to SQS:', error)

			throw error
		}
	}
}
