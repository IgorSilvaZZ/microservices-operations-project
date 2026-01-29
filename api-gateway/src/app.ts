import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { RpcCallErrors } from "operations-package";
import { ZodError } from "zod";
import { env } from "./env.ts";
import { ordersRoutes } from "./infra/http/controllers/orders/routes.ts";
import { userRoutes } from "./infra/http/controllers/users/routes.ts";
import { apiKeyPlugin } from "./infra/http/plugins/api-key.plugin.ts";

const app = fastify();

app.register(apiKeyPlugin, {
	keys: new Set([env.X_API_KEY]),
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(fastifyCors, {
	origin: true,
	methods: ["POST", "GET", "OPTIONS"],
});

app.register(userRoutes, ordersRoutes);

app.setErrorHandler((error, _, reply) => {
	console.error(error);

	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.format(),
		});
	}

	if (error instanceof RpcCallErrors) {
		console.error("RPC call failed:", error);

		return reply.status(error.statusCode).send({ message: error.message });
	}

	return reply.status(500).send({ message: "Internal server error" });
});

export { app };
