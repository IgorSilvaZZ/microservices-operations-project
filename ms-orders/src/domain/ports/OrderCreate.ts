import type { OrderStatusEnum } from "@domain/entities/Order";

export interface OrderCreateRequest {
	id?: string;
	number: string;
	description: string;
	userId: string;
	status?: OrderStatusEnum;
}
