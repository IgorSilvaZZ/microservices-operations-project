import type {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";

interface ApyKeyPluginOptions extends FastifyPluginOptions {
	keys: Set<string>;
}

export const apiKeyPlugin = fastifyPlugin(
	async (fastify: FastifyInstance, options: ApyKeyPluginOptions) => {
		const keys = options.keys || new Set();

		fastify.addHook(
			"onRequest",
			async (request: FastifyRequest, reply: FastifyReply) => {
				const apiKey = request.headers["x-api-key"];

				if (!apiKey || !keys.has(apiKey as string)) {
					return reply.status(401).send({ message: "Unauthorized" });
				}
			},
		);
	},
);
