import { vi } from 'vitest'

import {
	AuthenticateProvider,
	AuthenticateProviderResponse
} from '@ports/AuthenticateProvider'

export class AuthenticateProviderFakeAdapter implements AuthenticateProvider {
	authenticate =
		vi.fn<
			(email: string, password: string) => Promise<AuthenticateProviderResponse>
		>()
}
