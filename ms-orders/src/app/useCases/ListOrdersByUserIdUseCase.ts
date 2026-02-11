import { OrderDomainToNormalizedMapper } from "@app/infra/mappers/OrderDomainToNormalizedMapper";
import type { ListOrdersByUserIdRequest } from "@domain/ports/ListOrdersByUserId";
import type { OrderCreateResponse } from "@domain/ports/OrderCreate";
import type { OrderRepository } from "@domain/ports/OrderRepository";
import {
	AppError,
	GET_USER_QUEUE,
	type RabbitMQClientPort,
} from "operations-package";

export class ListOrdersByUserIdUseCase {
	constructor(
		private ordersRepository: OrderRepository,
		private rabbitMqClient: RabbitMQClientPort,
	) {}

	async execute({
		userId,
		status,
		page,
	}: ListOrdersByUserIdRequest): Promise<OrderCreateResponse[]> {
		const { data: response } = await this.rabbitMqClient.rpcCall(
			GET_USER_QUEUE,
			{
				id: userId,
			},
		);

		const user = response.user;

		if (!user) {
			throw new AppError("User not found");
		}

		const orders = await this.ordersRepository.getByUserIdWithFilters({
			userId,
			status,
			page,
		});

		return orders.map((item) =>
			OrderDomainToNormalizedMapper.toNormalized(item),
		);
	}
}
