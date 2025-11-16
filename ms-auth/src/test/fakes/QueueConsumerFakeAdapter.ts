import { vi } from 'vitest'

import { QueueConsumer, QueueConsumerProps } from '@ports/QueueConsumer'

export class QueueConsumerFakeAdapter implements QueueConsumer {
	public listenMock = vi.fn()
	public sendToQueueMock = vi.fn()

	async listen({
		queueName,
		handler,
		toReply
	}: QueueConsumerProps): Promise<any> {
		this.listenMock(queueName, handler, toReply)
	}

	// Metodo auxiliar para simular a mensagem chegando na fila
	async simulateMessage(message: unknown) {
		const calls = this.listenMock.mock.calls

		const lastCall = calls[calls.length - 1]

		if (!lastCall) {
			throw new Error('listen() not called')
		}

		const handler = lastCall[1]
		const toReply = lastCall[2]

		const result = await handler(message)

		if (toReply && toReply === true) {
			const correlationId = 'fake-correlation-id'
			const replyTo = 'fake-reply-queue'

			this.sendToQueueMock(replyTo, Buffer.from(JSON.stringify(result)), {
				correlationId
			})
		}
	}
}
