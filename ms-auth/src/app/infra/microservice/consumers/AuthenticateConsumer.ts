import { AuthenticateUserRequest } from '@ports/AuthenticateUser'
import { QueueConsumerProps } from '@ports/QueueConsumer'

import { RabbitMqQueueConsumer } from '@adapters/RabbitMqQueueConsumer'

import { makeAuthenticateUserUseCase } from '@factories/MakeAuthenticateUserUseCase'

export async function authenticateConsumer(): Promise<void> {
	const rabbitMqQueueConsumer = new RabbitMqQueueConsumer()

	const authenticateUserUseCase = makeAuthenticateUserUseCase()

	const listenAuthenticateProps: QueueConsumerProps = {
		queueName: 'authenticate_queue',
		handler: (message: unknown) =>
			authenticateUserUseCase.authenticate(message as AuthenticateUserRequest),
		toReply: true
	}

	await rabbitMqQueueConsumer.listen(listenAuthenticateProps)
}
