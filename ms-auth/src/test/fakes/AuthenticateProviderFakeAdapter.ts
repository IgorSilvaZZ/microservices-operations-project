import type {
	AuthenticateProvider,
	AuthenticateProviderResponse,
} from '@ports/AuthenticateProvider'
import { vi } from 'vitest'

export class AuthenticateProviderFakeAdapter implements AuthenticateProvider {
	authenticate =
		vi.fn<
			(email: string, password: string) => Promise<AuthenticateProviderResponse>
		>()
}
