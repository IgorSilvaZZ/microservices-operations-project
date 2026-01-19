import type { FastifyInstance } from "fastify";

import { authenticateUser } from "./authenticate.controller.ts";

export function userRoutes(app: FastifyInstance) {
	app.post("/sessions", authenticateUser);
}
