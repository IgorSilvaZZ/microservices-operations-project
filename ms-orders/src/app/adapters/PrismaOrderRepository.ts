import { PrismaOrderMapper } from "@app/infra/mappers/PrismaOrderMapper";
import { prisma } from "@app/prisma";
import type { Order } from "@domain/entities/Order";
import type { OrderCreateRequest } from "@domain/ports/OrderCreate";
import type { OrderRepository } from "@domain/ports/OrderRepository";

export class PrismaOrderRepository implements OrderRepository {
	async findByNumber(number: string): Promise<Order | null> {
		const order = await prisma.orders.findUnique({
			where: {
				number,
			},
		});

		if (!order) {
			return null;
		}

		return PrismaOrderMapper.toDomain(order);
	}

	async create(data: OrderCreateRequest): Promise<Order> {
		const order = await prisma.orders.create({
			data: {
				number: data.number,
				description: data.description,
				userId: data.userId,
				status: data.status as any,
			},
		});

		return PrismaOrderMapper.toDomain(order);
	}
}
