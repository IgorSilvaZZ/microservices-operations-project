import { randomUUID } from 'node:crypto'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'

import { User } from '@domain/entities/User'
import { Profile } from '@domain/entities/Profile'
import { Permissions } from '@domain/entities/Permissions'

import { UserRepositoryInMemory } from '@test/ports/UserRepositoryInMemory'
import { BcryptPasswordHasherFakeAdapter } from '@test/adapters/BcryptPasswordHasherFakeAdapter'
import { AuthenticateProviderFakeAdapter } from '@test/adapters/AuthenticateProviderFakeAdapter'

import { AuthenticateUserUseCase } from '@app/useCases/AuthenticateUserUseCase'

describe('Authenticate User Use Case', () => {
	let userRepositoryInMemory: UserRepositoryInMemory
	let bcryptPasswordHasherFakeAdapter: BcryptPasswordHasherFakeAdapter
	let authenticateProviderFakeAdapter: AuthenticateProviderFakeAdapter

	let authenticateUserUseCase: AuthenticateUserUseCase

	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory()
		bcryptPasswordHasherFakeAdapter = new BcryptPasswordHasherFakeAdapter()
		authenticateProviderFakeAdapter = new AuthenticateProviderFakeAdapter()

		userRepositoryInMemory.users.push(
			new User({
				id: randomUUID(),
				name: 'Test User',
				email: 'user@test.com',
				password: 'hashed-password',
				profileId: randomUUID(),
				subId: randomUUID(),
				profile: new Profile({
					description: 'Profile Test',
					permissions: [
						new Permissions({ name: 'CREATE_ORDERS' }),
						new Permissions({ name: 'GET_ORDERS' }),
						new Permissions({ name: 'GET_OPERATIONS' })
					]
				})
			})
		)

		authenticateUserUseCase = new AuthenticateUserUseCase(
			userRepositoryInMemory,
			bcryptPasswordHasherFakeAdapter,
			authenticateProviderFakeAdapter
		)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should authenticate a user with valid credentials', async () => {
		bcryptPasswordHasherFakeAdapter.compare.mockResolvedValue(true)
		authenticateProviderFakeAdapter.authenticate.mockResolvedValue({
			accessToken: 'access-token',
			idToken: 'id-token',
			refreshToken: 'refresh-token'
		})

		const { user, token } = await authenticateUserUseCase.authenticate({
			email: 'user@test.com',
			password: 'hashed-password'
		})

		expect(bcryptPasswordHasherFakeAdapter.compare).toBeCalledTimes(1)
		expect(authenticateProviderFakeAdapter.authenticate).toBeCalledTimes(1)

		expect(authenticateProviderFakeAdapter.authenticate).toBeCalledWith(
			'user@test.com',
			'hashed-password'
		)

		expect(token).toEqual(expect.any(String))
		expect(user.id).toEqual(expect.any(String))
		expect(user).toHaveProperty('id')
	})

	it('should not be able authenticate a user with invalid email', async () => {
		await expect(() => {
			return authenticateUserUseCase.authenticate({
				email: 'userInvalidEmail@test.com',
				password: 'hashed-password'
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('should not be able authenticate a user with invalid password', async () => {
		bcryptPasswordHasherFakeAdapter.compare.mockResolvedValue(false)

		await expect(() => {
			return authenticateUserUseCase.authenticate({
				email: 'user@test.com',
				password: 'invalid-password'
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('should not be able authenticate a user with error authenticate provider', async () => {
		bcryptPasswordHasherFakeAdapter.compare.mockResolvedValue(true)
		authenticateProviderFakeAdapter.authenticate.mockRejectedValue(
			new Error('Error authenticate provider')
		)

		await expect(() => {
			return authenticateUserUseCase.authenticate({
				email: 'user@test.com',
				password: 'hashed-password'
			})
		}).rejects.toBeInstanceOf(Error)
	})
})
