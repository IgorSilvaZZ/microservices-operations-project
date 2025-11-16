import { vi } from 'vitest'
import { randomUUID } from 'node:crypto'

import { QueuePublisher } from '@ports/QueuePublisher'

interface Publications {
	queueUrl: string
	correlationId: string
	success: boolean
	data: unknown
}

export class QueuePublisherFakeAdapter implements QueuePublisher {
	public publishMock = vi.fn()

	public publications: Publications[] = []

	async publish(queueUrl: string, message: unknown): Promise<void> {
		const correlationId = randomUUID()

		this.publishMock(queueUrl, message)

		try {
			this.publications.push({
				queueUrl,
				correlationId,
				data: message,
				success: true
			})
		} catch (error: any) {
			this.publications.push({
				queueUrl,
				correlationId,
				data: { message: error.message },
				success: false
			})
		}
	}
}
