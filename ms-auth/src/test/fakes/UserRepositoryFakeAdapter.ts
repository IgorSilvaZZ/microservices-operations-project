import { User } from '@domain/entities/User'

import { UserRepository } from '@domain/ports/UserRepository'

export class UserRepositoryFakeAdapter implements UserRepository {
	public users: User[] = []

	async findById(id: string): Promise<User | null> {
		const user = this.users.find(user => user.id === id)

		return user || null
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find(user => user.email === email)

		return user || null
	}

	async findByEmailWithPermissions(email: string): Promise<User | null> {
		const user = this.users.find(user => user.email === email)

		return user || null
	}
}
