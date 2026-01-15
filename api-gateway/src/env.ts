import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
	PORT: z.coerce.number().default(3333),
	X_API_KEY: z.string(),
	BROKER_URL: z.string(),
	BROKER_USER: z.string(),
	BROKER_PASSWORD: z.string(),
	JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
