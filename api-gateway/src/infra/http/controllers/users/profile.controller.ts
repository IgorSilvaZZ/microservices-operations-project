import type { FastifyReply, FastifyRequest } from "fastify";

import { getUserChannel } from "../../../broker/channels/users.ts";

import { rpcCall } from "../../../broker/rpc.ts";

export async function profile(req: FastifyRequest, rep: FastifyReply) {
	await req.jwtVerify();

	const { data } = await rpcCall(getUserChannel, "get_user_queue", {
		id: req.user.sub,
	});

	return rep.status(200).send(data.user);
}
