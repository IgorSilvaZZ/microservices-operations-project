import { vi } from 'vitest'

import { QueuePublisher } from '@ports/QueuePublisher'

interface Publications {
	queueName: string
	data: unknown
}

export class QueuePublisherFakeAdapter implements QueuePublisher {
	public publishMock = vi.fn()

	public publications: Publications[] = []

	async publish(queueName: string, message: unknown): Promise<void> {
		this.publishMock(queueName, message)

		this.publications.push({
			queueName,
			data: message
		})
	}
}
