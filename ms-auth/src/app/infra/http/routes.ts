import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/AuthenticationController'

export async function appRoutes(app: FastifyInstance) {
	app.post('/sessions', authenticate)
}
