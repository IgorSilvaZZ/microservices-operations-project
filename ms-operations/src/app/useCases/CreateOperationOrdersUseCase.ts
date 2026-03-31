import { OperationsStatusEnum } from "@domain/entities/Operation";
import type { OperationRepository } from "@domain/ports/OperationRepository";
import type {
	OperationsOrdersCreate,
	OperationsOrdersCreateRequest,
	OperationsOrdersCreateResponse,
} from "@domain/ports/OperationsOrdersCreate";
import type { OperationsOrdersRepository } from "@domain/ports/OperationsOrdersRepository";
import type { Order } from "@domain/ports/Order";
import { AppError, type RabbitMQClientPort } from "operations-package";

export class CreateOperationOrdersUseCase implements OperationsOrdersCreate {
	constructor(
		private operationRepository: OperationRepository,
		private operationsOrdersRepository: OperationsOrdersRepository,
		private rabbitMqClient: RabbitMQClientPort,
	) {}

	async create({
		number,
		userId,
		orderIds,
	}: OperationsOrdersCreateRequest): Promise<OperationsOrdersCreateResponse> {
		const operationExistsByNumber =
			await this.operationRepository.findByNumber(number);

		if (operationExistsByNumber) {
			throw new AppError("Operation already exists by number!");
		}

		const { data: ordersUser } = (await this.rabbitMqClient.rpcCall(
			"GET_ORDERS_BY_USER",
			{
				userId,
			},
		)) as { data: Order[] };

		if (!ordersUser.some((order) => orderIds.includes(order.id))) {
			throw new AppError("Order informed not exists");
		}

		try {
			const { id: operationId, status } = await this.operationRepository.create(
				{
					number,
					status: OperationsStatusEnum.PENDING,
					userId,
				},
			);

			await this.operationsOrdersRepository.create({
				number,
				userId,
				operationId,
				orderIds,
			});

			return {
				userId,
				number,
				status,
				operationId,
			};
		} catch (error) {
			console.log(error);

			throw new AppError("Error in create Operation");
		}
	}
}
