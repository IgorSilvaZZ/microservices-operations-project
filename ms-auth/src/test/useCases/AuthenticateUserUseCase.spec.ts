import { randomUUID } from 'node:crypto'
import { describe, it, beforeEach } from 'vitest'

import { User } from '@domain/entities/User'

import { UserRepositoryInMemory } from '@test/ports/UserRepositoryInMemory'
import { BcryptPasswordHasherFakeAdapter } from '@test/adapters/BcryptPasswordHasherFakeAdapter'

import { AuthenticateUserUseCase } from '@app/useCases/AuthenticateUserUseCase'

describe('Authenticate User Use Case', () => {
	let userRepositoryInMemory: UserRepositoryInMemory
	let bcryptPasswordHasherFakeAdapter: BcryptPasswordHasherFakeAdapter

	let authenticateUserUseCase: AuthenticateUserUseCase

	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory()
		bcryptPasswordHasherFakeAdapter = new BcryptPasswordHasherFakeAdapter()
	})

	it('should authenticate a user with valid credentials', async () => {
		userRepositoryInMemory.users.push(
			new User({
				id: randomUUID(),
				name: 'Test User',
				email: 'user@test.com',
				password: 'hashed-password',
				profileId: randomUUID(),
				subId: randomUUID()
			})
		)

		bcryptPasswordHasherFakeAdapter.compare.mockResolvedValue(true)
	})
})
