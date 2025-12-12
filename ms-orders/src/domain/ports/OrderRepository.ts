import { Order } from "@domain/entities/Order";

import { OrderCreateRequest } from "./OrderCreate";

export interface OrderRepository {
    create(data: OrderCreateRequest): Promise<Order>
    findByNumber(number: string): Promise<Order | null>
}