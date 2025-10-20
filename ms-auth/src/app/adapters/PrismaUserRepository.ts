import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/ports/UserRepository'

export class PrismaUserRepository implements UserRepository {
	async findById(id: string): Promise<User | null> {
		throw new Error('Method not implemented.')
	}

	async findByEmail(email: string): Promise<User | null> {
		throw new Error('Method not implemented.')
	}
}
