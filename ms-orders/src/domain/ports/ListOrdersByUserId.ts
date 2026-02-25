import type { OrderStatusEnum } from "@domain/entities/Order";

export interface ListOrdersByUserIdRequest {
	userId: string;
	filters?: {
		status?: OrderStatusEnum;
	};
	page: number;
}
