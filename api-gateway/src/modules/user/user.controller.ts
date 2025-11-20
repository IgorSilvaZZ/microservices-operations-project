import { randomUUID } from "node:crypto";

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

	const queueReplyName = "authenticate_queue_reply";

	const correlationId = randomUUID();

	authenticateChannel.sendToQueue(
		"authenticate_queue",
		Buffer.from(JSON.stringify({ email, password })),
		{
			correlationId,
			replyTo: queueReplyName,
		},
	);

	const reply = await rpcCall(
		authenticateChannel,
		queueReplyName,
		correlationId,
	);

	console.log("Reply received:", reply);

	return rep.status(200).send({ message: "User authenticated successfully" });
}
