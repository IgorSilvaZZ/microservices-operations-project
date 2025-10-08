import { User, UserProps } from '@entities/User'
import {
	AuthenticateUser,
	AuthenticateUserRequest
} from '@ports/AuthenticateUser'

import { PasswordHasher } from '@ports/PasswordHasher'
import { UserRepository } from '@ports/UserRepository'

export class AuthenticateUserUseCase implements AuthenticateUser {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher
	) {}

	async authenticate({
		email,
		password
	}: AuthenticateUserRequest): Promise<User> {
		const userExists = await this.userRepository.findByEmail(email)

		if (!userExists) {
			// TODO: create custom errors and change this instance
			throw new Error('User not found!')
		}

		if (!(await this.passwordHasher.compare(password, userExists.password))) {
			// TODO: create custom errors and change this instance
			throw new Error('Email/Password is incorrect!')
		}

		const propsUser: UserProps = {
			id: userExists.id,
			name: userExists.name,
			email: userExists.email,
			password: userExists.password,
			subId: userExists.subId, // Trocar pelo subId gerado pelo cognito
			createdAt: userExists.createdAt,
			updatedAt: userExists.updatedAt
		}

		return userExists
	}
}
