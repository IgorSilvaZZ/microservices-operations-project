import type { Order } from "@domain/entities/Order";
import type { ListOrdersByUserIdRequest } from "./ListOrdersByUserId";
import type { OrderCreateRequest } from "./OrderCreate";

export interface OrderRepository {
	searchManyByUserId(data: ListOrdersByUserIdRequest): Promise<Order[]>;
	create(data: OrderCreateRequest): Promise<Order>;
}
