import { PrismaOrderMapper } from "@app/infra/mappers/PrismaOrderMapper";
import { prisma } from "@app/prisma";
import type { Order } from "@domain/entities/Order";
import type { ListOrdersByUserIdRequest } from "@domain/ports/ListOrdersByUserId";
import type { OrderCreateRequest } from "@domain/ports/OrderCreate";
import type { OrderRepository } from "@domain/ports/OrderRepository";

export class PrismaOrderRepository implements OrderRepository {
	async searchManyByUserId({
		userId,
		filters,
		page,
	}: ListOrdersByUserIdRequest): Promise<Order[]> {
		const where: any = {
			userId,
		};

		if (filters) {
			if (filters.status) {
				where.status = filters.status;
			}
		}

		const orders = await prisma.orders.findMany({
			where,
			skip: (page - 1) * 10,
			take: 20,
		});

		const ordersMapped = orders.map(PrismaOrderMapper.toDomain);

		return ordersMapped;
	}

	async create(data: OrderCreateRequest): Promise<Order> {
		const order = await prisma.orders.create({
			data: {
				value: data.value,
				description: data.description,
				userId: data.userId,
				status: data.status as any,
			},
		});

		return PrismaOrderMapper.toDomain(order);
	}
}
