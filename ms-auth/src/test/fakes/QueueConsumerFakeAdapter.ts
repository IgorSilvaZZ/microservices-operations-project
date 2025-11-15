import { vi } from 'vitest'

import { QueueConsumer } from '@ports/QueueConsumer'

export class QueueConsumerFakeAdapter implements QueueConsumer {
	public listenMock = vi.fn()

	async listen(
		queueName: string,
		handler: (message: unknown) => Promise<void>
	): Promise<void> {
		this.listenMock(queueName, handler)
	}

	// Metodo auxiliar para simular a mensagem chegando na fila
	async simulateMessage(message: unknown) {
		const calls = this.listenMock.mock.calls

		const lastCall = calls[calls.length - 1]

		if (!lastCall) {
			throw new Error('listen() not called')
		}

		const handler = lastCall[1]

		await handler(message)
	}
}
