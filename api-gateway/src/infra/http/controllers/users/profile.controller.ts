import type { FastifyReply, FastifyRequest } from "fastify";
import { GET_USER_QUEUE } from "operations-package";

import { broker } from "../../../broker/index.ts";

export async function profile(req: FastifyRequest, rep: FastifyReply) {
	await req.jwtVerify();

	const { data } = await broker.rpcCall(GET_USER_QUEUE, {
		id: req.user.sub,
	});

	return rep.status(200).send(data.user);
}
