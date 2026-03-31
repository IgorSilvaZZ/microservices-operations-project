import type { OperationsStatusEnum } from "@domain/entities/Operation";

export interface OperationsOrdersCreateRequest {
	userId: string;
	number: number;
	orderIds: string[];
}

export interface OperationsOrdersCreateResponse {
	userId: string;
	number: number;
	status: OperationsStatusEnum;
	operationId: string;
}

// Caso de uso que condiz com a criação de operação e linkando pedidos com operações
export interface OperationsOrdersCreate {
	create(
		operationsOrders: OperationsOrdersCreateRequest,
	): Promise<OperationsOrdersCreateResponse>;
}
