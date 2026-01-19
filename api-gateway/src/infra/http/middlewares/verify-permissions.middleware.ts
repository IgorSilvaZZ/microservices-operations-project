import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyPermission(permission: string) {
	return async (req: FastifyRequest, rep: FastifyReply) => {
		try {
			const userPermissions: string[] = req.user.permissions || [];

			const hasPermission = userPermissions.includes(permission);

			if (!hasPermission) {
				return rep.status(403).send({ message: "Forbidden" });
			}
		} catch (error) {
			console.error("Permissions verification failed:", error);

			return rep.status(403).send({ message: "Forbidden" });
		}
	};
}
