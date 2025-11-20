import type { FastifyInstance } from "fastify";

import { authenticateUser } from "./modules/user/user.controller.ts";

export async function appRoutes(app: FastifyInstance) {
	app.post("/sessions", authenticateUser);
}
