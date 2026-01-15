import { fastifyCors } from "@fastify/cors";
import fastify from "fastify";

import { env } from "./env.ts";
import { userRoutes } from "./infra/http/controllers/routes.ts";
import { apiKeyPlugin } from "./infra/http/plugins/api-key.plugin.ts";

const app = fastify();

app.register(apiKeyPlugin, {
	keys: new Set([env.X_API_KEY]),
});

app.register(fastifyCors, {
	origin: true,
	methods: ["POST", "GET", "OPTIONS"],
});

app.register(userRoutes);

export { app };
