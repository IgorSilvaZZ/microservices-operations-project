import { makeListOrdersByUserIdUseCase } from "@app/infra/factories/MakeListOrdersByUserIdUseCase";
import type { ListOrdersByUserIdRequest } from "@domain/ports/ListOrdersByUserId";
import {
	GET_ORDERS_BY_USER_ID_QUEUE,
	type QueueConsumerProps,
} from "operations-package";
import { rabbitMqQueueClient } from "../shared/RabbitMQClient";

export async function listOrderByUserIdConsumer(): Promise<void> {
	const listOrdersByUserIdUseCase = makeListOrdersByUserIdUseCase();

	const listenGetOrdersByUserIdProps: QueueConsumerProps = {
		queueName: GET_ORDERS_BY_USER_ID_QUEUE,
		handler: (message) =>
			listOrdersByUserIdUseCase.execute(message as ListOrdersByUserIdRequest),
		toReply: true,
	};

	await rabbitMqQueueClient.listen(listenGetOrdersByUserIdProps);
}
