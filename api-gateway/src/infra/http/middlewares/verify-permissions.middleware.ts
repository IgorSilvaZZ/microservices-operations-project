import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyPermissions(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	try {
		const userPermissions: string[] = req.user.permissions || [];
	} catch (error) {
		console.error("Permissions verification failed:", error);

		return rep.status(403).send({ message: "Forbidden" });
	}
}
