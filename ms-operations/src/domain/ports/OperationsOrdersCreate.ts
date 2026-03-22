import type { OperationsStatusEnum } from "@domain/entities/Operation";

export interface OperationsOrdersCreateRequest {
	orderId: string;
	operationId: string;
	userId: string;
	number: number;
	status: OperationsStatusEnum;
}

export interface OperationsOrdersCreateResponse {
	orderId: string;
	operationId: string;
	userId: string;
	number: number;
	status: OperationsStatusEnum;
}

export interface OperationsOrdersCreate {
	create(
		operationsOrders: OperationsOrdersCreateRequest,
	): Promise<OperationsOrdersCreateResponse>;
}
