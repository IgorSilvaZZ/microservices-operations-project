import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(req: FastifyRequest, rep: FastifyReply) {
	try {
		await req.jwtVerify();
	} catch (error) {
		console.error("JWT verification failed:", error);

		return rep.status(401).send({ message: "Unauthorized" });
	}
}
