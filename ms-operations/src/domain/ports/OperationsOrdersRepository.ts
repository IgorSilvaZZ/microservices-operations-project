import type { OperationsOrders } from "@domain/entities/OperationsOrders";
import type { OperationsOrdersCreateRequest } from "./OperationsOrdersCreate";

export type OperationsOrdersCreateData = OperationsOrdersCreateRequest & {
	operationId: string;
};

export interface OperationsOrdersRepository {
	create(data: OperationsOrdersCreateData): Promise<OperationsOrders[]>;
}
