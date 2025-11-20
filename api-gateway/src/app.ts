import { fastifyCors } from "@fastify/cors";
import fastify from "fastify";

import { env } from "./env.ts";

import { apiKeyPlugin } from "./plugins/api-key.plugin.ts";

import { appRoutes } from "./router.ts";

const app = fastify();

app.register(apiKeyPlugin, {
	keys: new Set([env.X_API_KEY]),
});

app.register(fastifyCors, {
	origin: true,
	methods: ["POST", "GET", "OPTIONS"],
});

app.register(appRoutes);

export { app };
