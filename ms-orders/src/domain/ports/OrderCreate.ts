import type { OrderStatusEnum } from "@domain/entities/Order";

export interface OrderCreateRequest {
	number: string;
	description: string;
	userId: string;
	status?: OrderStatusEnum;
}

export interface OrderCreateResponse {
	id: string;
	number: string;
	description: string;
	userId: string;
	status: OrderStatusEnum;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderCreate {
	create(order: OrderCreateRequest): Promise<OrderCreateResponse>;
}
