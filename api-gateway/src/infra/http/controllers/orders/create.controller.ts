import type { FastifyReply, FastifyRequest } from "fastify";
import { CREATE_ORDER_QUEUE } from "operations-package";
import z from "zod";
import { OrderStatusEnum } from "../../../../shared/enums/OrderStatusEnum";
import { broker } from "../../../broker";

export async function create(req: FastifyRequest, rep: FastifyReply) {
	const createOrderSchema = z.object({
		value: z.number(),
		description: z.string().default(""),
		status: z.enum(OrderStatusEnum).default(OrderStatusEnum.PENDING),
	});

	const { value, description, status } = createOrderSchema.parse(req.body);

	const userId = req.user.sub;

	const { data } = await broker.rpcCall(CREATE_ORDER_QUEUE, {
		value,
		description,
		status,
		userId,
	});

	return rep.status(201).send({
		order: data,
	});
}
