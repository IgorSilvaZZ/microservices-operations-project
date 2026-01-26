import { OrderDomainToNormalizedMapper } from "@app/infra/mappers/OrderDomainToNormalizedMapper";
import type {
	OrderCreate,
	OrderCreateRequest,
	OrderCreateResponse,
} from "@ports/OrderCreate";
import type { OrderRepository } from "@ports/OrderRepository";
import {
	AppError,
	GET_USER_QUEUE,
	type RabbitMQClientPort,
} from "operations-package";

export class CreateOrderUseCase implements OrderCreate {
	constructor(
		private orderRepository: OrderRepository,
		private rabbitMqClient: RabbitMQClientPort,
	) {}

	async create(data: OrderCreateRequest): Promise<OrderCreateResponse> {
		const user = await this.rabbitMqClient.rpcCall(GET_USER_QUEUE, {
			id: data.userId,
		});

		if (!user) {
			throw new AppError("User not found");
		}

		const order = await this.orderRepository.create(data);

		return OrderDomainToNormalizedMapper.toNormalized(order);
	}
}
