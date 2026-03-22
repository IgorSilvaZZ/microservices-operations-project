import type { OperationsOrders } from "@domain/entities/OperationsOrders";
import type { OperationsOrdersCreateRequest } from "./OperationsOrdersCreate";

export interface OperationsOrdersRepository {
	create(data: OperationsOrdersCreateRequest): Promise<OperationsOrders>;
}
