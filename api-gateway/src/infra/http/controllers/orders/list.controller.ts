import type { FastifyReply, FastifyRequest } from "fastify";
import { GET_ORDERS_BY_USER_ID_QUEUE } from "operations-package";
import z from "zod";
import { OrderStatusEnum } from "../../../../shared/enums/OrderStatusEnum";
import { broker } from "../../../broker";

export async function list(req: FastifyRequest, rep: FastifyReply) {
	const listOrdersQuerySchema = z.object({
		page: z.coerce.number().default(1),
		status: z.enum(OrderStatusEnum).optional(),
	});

	const { page, status } = listOrdersQuerySchema.parse(req.query);

	const filters = {
		status,
	};

	const userId = req.user.sub;

	const { data: orders } = await broker.rpcCall(GET_ORDERS_BY_USER_ID_QUEUE, {
		userId,
		page,
		filters,
	});

	return rep.status(200).send({
		orders,
	});
}
