import { Order, type OrderStatusEnum } from "@domain/entities/Order";
import type { Orders as PrismaOrders } from "@prisma/client";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaOrderMapper {
	static toDomain(raw: PrismaOrders) {
		return new Order({
			id: raw.id,
			description: raw.description,
			number: raw.number,
			status: raw.status as OrderStatusEnum,
			userId: raw.userId,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
			deletedAt: raw.deletedAt ?? undefined,
		});
	}
}
