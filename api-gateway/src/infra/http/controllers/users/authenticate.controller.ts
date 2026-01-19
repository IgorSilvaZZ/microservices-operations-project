import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { authenticateChannel } from "../../../broker/channels/users.ts";
import { RpcCallErrors } from "../../../broker/errors/RpcCallErrors.ts";
import { rpcCall } from "../../../broker/rpc.ts";

export async function authenticateUser(req: FastifyRequest, rep: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.email(),
		password: z.string().min(4),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	try {
		const requestPayload = { email, password };

		const { data } = await rpcCall(
			authenticateChannel,
			"authenticate_queue",
			requestPayload,
		);

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
	} catch (error) {
		console.error("RPC call failed:", error);

		if (error instanceof RpcCallErrors) {
			return rep.status(error.statusCode).send({ message: error.message });
		}

		return rep.status(500).send({ message: "Internal Server Error" });
	}
}
