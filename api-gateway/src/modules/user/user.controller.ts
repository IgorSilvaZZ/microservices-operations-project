import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticateUser(req: FastifyRequest, rep: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.email(),
		password: z.string().min(4),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	console.log({ email, password });

	return rep.status(200).send({ message: "User authenticated successfully" });
}
