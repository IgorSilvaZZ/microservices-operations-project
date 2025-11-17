import type { FastifyInstance } from "fastify";

import { authenticateUser } from "./modules/user/user.controller";

export async function appRoutes(app: FastifyInstance) {
	app.post("/sessions", authenticateUser);
}
