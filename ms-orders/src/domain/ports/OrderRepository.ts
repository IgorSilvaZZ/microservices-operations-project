import type { Order } from "@domain/entities/Order";

import type { OrderCreateRequest } from "./OrderCreate";

export interface OrderRepository {
	create(data: OrderCreateRequest): Promise<Order>;
}
