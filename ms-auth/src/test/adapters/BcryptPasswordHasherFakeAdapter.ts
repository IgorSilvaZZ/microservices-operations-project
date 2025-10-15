import { vi } from 'vitest'

import { PasswordHasher } from '@ports/PasswordHasher'

export class BcryptPasswordHasherFakeAdapter implements PasswordHasher {
	hash = vi.fn<(password: string) => Promise<string>>()
	compare =
		vi.fn<(password: string, passwordHashed: string) => Promise<boolean>>()
}
