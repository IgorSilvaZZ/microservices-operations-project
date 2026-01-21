import type { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt.middleware.ts";

import { authenticateUser } from "./authenticate.controller.ts";
import { profile } from "./profile.controller.ts";

export function userRoutes(app: FastifyInstance) {
	app.post("/sessions", authenticateUser);

	app.get("/me", { onRequest: [verifyJwt] }, profile);
}
