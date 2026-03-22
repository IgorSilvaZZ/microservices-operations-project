import { OperationsOrders } from "@domain/entities/OperationsOrders";
import type { OperationsOrdersCreateRequest } from "@domain/ports/OperationsOrdersCreate";
import type { OperationsOrdersRepository } from "@domain/ports/OperationsOrdersRepository";

export class OperationsOrdersRepositoryFakeAdapter
	implements OperationsOrdersRepository
{
	public operationsOrders: OperationsOrders[] = [];

	async create(data: OperationsOrdersCreateRequest): Promise<OperationsOrders> {
		const orderOperation = new OperationsOrders({
			operationId: data.operationId,
			orderId: data.orderId,
		});

		this.operationsOrders.push(orderOperation);

		return orderOperation;
	}
}
