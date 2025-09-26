import { User, UserProps } from '@entities/User'
import {
	AuthenticateUser,
	AuthenticateUserRequest
} from '@ports/AuthenticateUser'

import { UserRepository } from '../../domain/ports/UserRepository'

export class AuthenticateUserUseCase implements AuthenticateUser {
	constructor(private userRepository: UserRepository) {}

	async authenticate({
		email,
		password
	}: AuthenticateUserRequest): Promise<User> {
		const userExists = await this.userRepository.findByEmail(email)

		if (!userExists) {
			// TODO: create custom errors and change this instance
			throw new Error('User not found!')
		}

		const propsUser: UserProps = {
			id: userExists.id,
			name: userExists.name,
			email: userExists.email,
			password: userExists.password,
			subId: userExists.subId,
			createdAt: userExists.createdAt,
			updatedAt: userExists.updatedAt
		}

		return userExists
	}
}
