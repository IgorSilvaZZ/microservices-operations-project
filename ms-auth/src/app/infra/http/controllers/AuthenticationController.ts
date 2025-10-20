import { FastifyReply, FastifyRequest } from 'fastify'

export class AuthenticationController {
	async handler(request: FastifyRequest, reply: FastifyReply) {
		return reply.status(200).send({ message: 'Authentication successful' })
	}
}
