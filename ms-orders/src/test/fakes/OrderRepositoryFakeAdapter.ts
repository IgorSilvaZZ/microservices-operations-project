import { randomUUID } from "node:crypto";

import { Order, OrderStatusEnum } from "@domain/entities/Order";
import type { OrderCreateRequest } from "@domain/ports/OrderCreate";

import type { OrderRepository } from "@ports/OrderRepository";

export class OrderRepositoryFakeAdapter implements OrderRepository {
	public orders: Order[] = [];

	async create(data: OrderCreateRequest): Promise<Order> {
		const order = new Order({
			id: randomUUID(),
			value: data.value,
			description: data.description,
			userId: data.userId,
			status: data.status ?? OrderStatusEnum.PENDING,
			createdAt: new Date(),
		});

		this.orders.push(order);

		return order;
	}
}
