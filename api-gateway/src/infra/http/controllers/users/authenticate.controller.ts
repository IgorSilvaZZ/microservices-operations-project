import type { FastifyReply, FastifyRequest } from "fastify";
import { AUTHENTICATE_QUEUE } from "operations-package";
import z from "zod";

import { broker } from "../../../broker/index.ts";

export async function authenticateUser(req: FastifyRequest, rep: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.email(),
		password: z.string().min(4),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	const requestPayload = { email, password };

	const { data } = await broker.rpcCall(AUTHENTICATE_QUEUE, requestPayload);

	const { user, cognitoAccessToken } = data;

	const token = await rep.jwtSign({
		sub: user.id,
		email: user.email,
		permissions: user.permissions,
		cognitoAccessToken,
	});

	return rep.status(200).send({
		user,
		token,
	});
}
