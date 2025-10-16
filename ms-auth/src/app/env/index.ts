import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'prod']).default('dev'),
	DATABASE_URL: z.string(),
	COGNITO_CLIENT_ID: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error('Invalid environment variables', _env.error.message)

	throw new Error('Invalid environment variables.')
}

export const env = _env.data
