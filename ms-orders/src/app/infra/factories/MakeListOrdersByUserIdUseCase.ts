import { PrismaOrderRepository } from "@app/adapters/PrismaOrderRepository";
import { ListOrdersByUserIdUseCase } from "@app/useCases/ListOrdersByUserIdUseCase";
import { rabbitMqQueueClient } from "../microservice/shared/RabbitMQClient";

export const makeListOrdersByUserIdUseCase = () => {
	const prismaOrderRepository = new PrismaOrderRepository();

	const listOrdersByUserIdUseCase = new ListOrdersByUserIdUseCase(
		prismaOrderRepository,
		rabbitMqQueueClient,
	);

	return listOrdersByUserIdUseCase;
};
