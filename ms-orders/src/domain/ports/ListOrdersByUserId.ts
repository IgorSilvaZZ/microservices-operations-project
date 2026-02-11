import type { OrderStatusEnum } from "@domain/entities/Order";

export interface ListOrdersByUserIdRequest {
	userId: string;
	status?: OrderStatusEnum;
	page: number;
}
