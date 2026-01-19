import type { GetUserRequest } from "@domain/ports/GetUser";
import { makeGetUserUseCase } from "@factories/MakeGetUserUseCase";
import type { QueueConsumerProps } from "operations-package";
import { GET_USER_QUEUE } from "../shared/Queues";
import { rabbitMqQueueClient } from "../shared/RabbitMQClient";

export async function getUserConsumer(): Promise<void> {
	const getUserUseCase = makeGetUserUseCase();

	const listenGetUserProps: QueueConsumerProps = {
		queueName: GET_USER_QUEUE,
		handler: (message: unknown) =>
			getUserUseCase.getUser(message as GetUserRequest),
		toReply: true,
	};

	await rabbitMqQueueClient.listen(listenGetUserProps);
}
