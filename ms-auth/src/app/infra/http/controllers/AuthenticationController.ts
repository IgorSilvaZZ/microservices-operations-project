import { makeAuthenticateUserUseCase } from "@factories/MakeAuthenticateUserUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.email(),
		password: z.string().min(4),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	const authenticateUserUseCase = makeAuthenticateUserUseCase();

	const { user, token } = await authenticateUserUseCase.authenticate({
		email,
		password,
	});

	return rep.status(200).send({ user, token });
}
