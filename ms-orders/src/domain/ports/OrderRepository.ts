import type { Order } from "@domain/entities/Order";
import type { ListOrdersByUserIdRequest } from "./ListOrdersByUserId";
import type { OrderCreateRequest } from "./OrderCreate";

export interface OrderRepository {
	create(data: OrderCreateRequest): Promise<Order>;
	getByUserIdWithFilters(data: ListOrdersByUserIdRequest): Promise<Order[]>;
}
