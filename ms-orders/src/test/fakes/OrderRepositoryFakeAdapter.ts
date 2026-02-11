import { randomUUID } from "node:crypto";

import { Order, OrderStatusEnum } from "@domain/entities/Order";
import type { ListOrdersByUserIdRequest } from "@domain/ports/ListOrdersByUserId";
import type { OrderCreateRequest } from "@domain/ports/OrderCreate";
import type { OrderRepository } from "@ports/OrderRepository";

export class OrderRepositoryFakeAdapter implements OrderRepository {
	public orders: Order[] = [];

	async getByUserIdWithFilters({
		userId,
		page,
		status,
	}: ListOrdersByUserIdRequest): Promise<Order[]> {
		let ordersByUser = this.orders.filter((item) => item.userId === userId);

		if (status) {
			ordersByUser = ordersByUser.filter((item) => item.status === status);
		}

		return ordersByUser.slice((page - 1) * 20, page * 20);
	}

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
