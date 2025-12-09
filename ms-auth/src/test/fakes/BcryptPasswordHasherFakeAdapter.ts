import type { PasswordHasher } from '@ports/PasswordHasher'
import { vi } from 'vitest'

export class BcryptPasswordHasherFakeAdapter implements PasswordHasher {
	hash = vi.fn<(password: string) => Promise<string>>()
	compare =
		vi.fn<(password: string, passwordHashed: string) => Promise<boolean>>()
}
