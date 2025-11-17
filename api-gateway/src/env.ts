import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
	PORT: z.coerce.number().default(3333),
	X_API_KEY: z.string(),
	RABBITMQ_URL: z.string(),
	RABBITMQ_USER: z.string(),
	RABBITMQ_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
