import type { PasswordHasher } from '@ports/PasswordHasher'
import bcrypt from 'bcryptjs'

export class BcryptPasswordHasher implements PasswordHasher {
	private readonly rounds = 10

	async hash(password: string): Promise<string> {
		const passwordHashed = await bcrypt.hash(password, this.rounds)

		return passwordHashed
	}

	async compare(password: string, passwordHashed: string): Promise<boolean> {
		return await bcrypt.compare(password, passwordHashed)
	}
}
