import { PrismaUserRepository } from '@adapters/PrismaUserRepository'
import { BcryptPasswordHasher } from '@adapters/BcryptPasswordHasher'
import { AuthenticateProviderAdapter } from '@adapters/AuthenticateProvider'

import { AuthenticateUserUseCase } from '@useCases/AuthenticateUserUseCase'

export const makeAuthenticateUserUseCase = () => {
	const prismaUserRepository = new PrismaUserRepository()
	const bcryptPasswordHasher = new BcryptPasswordHasher()
	const authenticateProviderAdapter = new AuthenticateProviderAdapter()

	const authenticateUserUseCase = new AuthenticateUserUseCase(
		prismaUserRepository,
		bcryptPasswordHasher,
		authenticateProviderAdapter
	)

	return authenticateUserUseCase
}
