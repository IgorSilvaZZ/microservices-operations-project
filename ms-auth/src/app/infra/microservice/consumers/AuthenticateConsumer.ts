import { makeAuthenticateUserUseCase } from "@factories/MakeAuthenticateUserUseCase";
import type { AuthenticateUserRequest } from "@ports/AuthenticateUser";
import {
	AUTHENTICATE_QUEUE,
	type QueueConsumerProps,
} from "operations-package";
import { rabbitMqQueueClient } from "../shared/RabbitMQClient";

export async function authenticateConsumer(): Promise<void> {
	const authenticateUserUseCase = makeAuthenticateUserUseCase();

	const listenAuthenticateProps: QueueConsumerProps = {
		queueName: AUTHENTICATE_QUEUE,
		handler: (message: unknown) =>
			authenticateUserUseCase.authenticate(message as AuthenticateUserRequest),
		toReply: true,
	};

	await rabbitMqQueueClient.listen(listenAuthenticateProps);
}
