import { makeCreateOrderUseCase } from "@app/infra/factories/MakeCreateOrderUseCase";
import type { OrderCreateRequest } from "@domain/ports/OrderCreate";
import {
	CREATE_ORDER_QUEUE,
	type QueueConsumerProps,
} from "operations-package";
import { rabbitMqQueueClient } from "../shared/RabbitMQClient";

export async function createOrderConsumer(): Promise<void> {
	const createOrderUseCase = makeCreateOrderUseCase();

	const listenOrderProps: QueueConsumerProps = {
		queueName: CREATE_ORDER_QUEUE,
		handler: (message) =>
			createOrderUseCase.create(message as OrderCreateRequest),
		toReply: true,
	};

	await rabbitMqQueueClient.listen(listenOrderProps);
}
