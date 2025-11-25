import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { authenticateChannel } from "../../broker/channels/authenticate.ts";

import { rpcCall } from "../../broker/rpc.ts";

export async function authenticateUser(req: FastifyRequest, rep: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.email(),
		password: z.string().min(4),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	try {
		const requestPayload = { email, password };

		console.log(`[API] Sending to authenticate_queue:`, requestPayload);

		const reply = await rpcCall(
			authenticateChannel,
			"authenticate_queue",
			requestPayload,
		);

		console.log("Reply received:", reply);

		return rep.status(200).send({ message: "User authenticated successfully" });
	} catch (error) {
		console.error("RPC call failed:", error);

		return rep.status(400).send({ message: "Authenticate failed" });
	}
}
