import { OperationsOrders } from "@domain/entities/OperationsOrders";
import type {
	OperationsOrdersCreateData,
	OperationsOrdersRepository,
} from "@domain/ports/OperationsOrdersRepository";

export class OperationsOrdersRepositoryFakeAdapter
	implements OperationsOrdersRepository
{
	public operationsOrders: OperationsOrders[] = [];

	async create(data: OperationsOrdersCreateData): Promise<OperationsOrders[]> {
		const operationsOrders = data.orderIds.map((orderId) => {
			return new OperationsOrders({
				operationId: data.operationId,
				orderId,
			});
		});

		this.operationsOrders = [...this.operationsOrders, ...operationsOrders];

		return operationsOrders;
	}
}
