import type { OrderStatusEnum } from "@domain/entities/Order";

export interface OrderCreateRequest {
	value: number;
	description: string;
	userId: string;
	status: OrderStatusEnum;
}

export interface OrderCreateResponse {
	id: string;
	value: number;
	description: string;
	userId: string;
	status: OrderStatusEnum;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderCreate {
	create(order: OrderCreateRequest): Promise<OrderCreateResponse>;
}
