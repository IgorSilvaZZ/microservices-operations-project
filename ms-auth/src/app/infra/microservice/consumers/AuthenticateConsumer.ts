import { AuthenticateUserRequest } from '@ports/AuthenticateUser'

import { QueueSQSConsumer } from '@adapters/QueueSQSConsumer'
import { QueueSQSPublisher } from '@adapters/QueueSQSPublisher'

import { makeAuthenticateUserUseCase } from '@factories/MakeAuthenticateUserUseCase'

export async function authenticateConsumer(): Promise<void> {
	const queueUrl = process.env.AUTHENTICATE_QUEUE_URL!
	const queueResponseUrl = process.env.AUTHENTICATE_QUEUE_RESPONSE_URL!

	const queueSQSConsumer = new QueueSQSConsumer()
	const queueSQSPublisher = new QueueSQSPublisher()

	const authenticateUserUseCase = makeAuthenticateUserUseCase()

	queueSQSConsumer.listen(queueUrl, async message => {
		// TODO: Trocar o tipo da message e colocar a tipagem de payload e correlationId
		// TODO: Colocar suporte para o correlationId

		const { user, token } = await authenticateUserUseCase.authenticate(
			message as AuthenticateUserRequest
		)

		// Publicando na fila de resposta
		await queueSQSPublisher.publish(queueResponseUrl, { data: { user, token } })
	})
}
