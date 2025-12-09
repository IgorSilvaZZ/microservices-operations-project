import { RabbitMqQueueConsumer } from '@adapters/RabbitMqQueueConsumer'
import { makeAuthenticateUserUseCase } from '@factories/MakeAuthenticateUserUseCase'
import type { AuthenticateUserRequest } from '@ports/AuthenticateUser'
import type { QueueConsumerProps } from '@ports/QueueConsumer'

export async function authenticateConsumer(): Promise<void> {
	const rabbitMqQueueConsumer = new RabbitMqQueueConsumer()

	const authenticateUserUseCase = makeAuthenticateUserUseCase()

	const listenAuthenticateProps: QueueConsumerProps = {
		queueName: 'authenticate_queue',
		handler: (message: unknown) =>
			authenticateUserUseCase.authenticate(message as AuthenticateUserRequest),
		toReply: true,
	}

	await rabbitMqQueueConsumer.listen(listenAuthenticateProps)
}
