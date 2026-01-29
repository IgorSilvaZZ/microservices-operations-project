import type { Order } from "@domain/entities/Order";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class OrderDomainToNormalizedMapper {
	static toNormalized(order: Order) {
		return {
			id: order.id,
			number: order.number,
			description: order.description,
			userId: order.userId,
			status: order.status,
			createdAt: order.createdAt,
			updatedAt: order.updatedAt,
		};
	}
}
