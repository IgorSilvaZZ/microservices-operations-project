import { PrismaOrderRepository } from "@app/adapters/PrismaOrderRepository";
import { rabbitMqQueueClient } from "@app/infra/microservice/shared/RabbitMQClient";
import { CreateOrderUseCase } from "@app/useCases/CreateOrderUseCase";

export const makeCreateOrderUseCase = () => {
	const prismaOrderRepository = new PrismaOrderRepository();

	const createOrderUseCase = new CreateOrderUseCase(
		prismaOrderRepository,
		rabbitMqQueueClient,
	);

	return createOrderUseCase;
};
