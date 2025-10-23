import {
	AuthenticateUser,
	AuthenticateUserRequest,
	AuthenticateUserResponse
} from '@ports/AuthenticateUser'

import { PasswordHasher } from '@ports/PasswordHasher'
import { UserRepository } from '@ports/UserRepository'
import { AuthenticateProvider } from '@ports/AuthenticateProvider'

export class AuthenticateUserUseCase implements AuthenticateUser {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private authenticationProvider: AuthenticateProvider
	) {}

	async authenticate({
		email,
		password
	}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			// TODO: create custom errors and change this instance
			throw new Error('User not found!')
		}

		if (!(await this.passwordHasher.compare(password, user.password))) {
			// TODO: create custom errors and change this instance
			throw new Error('Email/Password is incorrect!')
		}

		try {
			const { accessToken } = await this.authenticationProvider.authenticate(
				email,
				password
			)

			return {
				user,
				token: accessToken
			}
		} catch (error) {
			console.log(error)

			throw new Error('Error authenticate provider!')
		}
	}
}
