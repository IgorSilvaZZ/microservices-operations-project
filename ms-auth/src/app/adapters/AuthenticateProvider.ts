import {
	CognitoIdentityProviderClient,
	InitiateAuthCommand
} from '@aws-sdk/client-cognito-identity-provider'

import { env } from '@app/env'

import {
	AuthenticateProvider,
	AuthenticateProviderResponse
} from '@domain/ports/AuthenticateProvider'

export class AuthenticateProviderAdapter implements AuthenticateProvider {
	private client: CognitoIdentityProviderClient

	constructor() {
		this.client = new CognitoIdentityProviderClient({ region: 'us-east-1' })
	}

	async authenticate(
		email: string,
		password: string
	): Promise<AuthenticateProviderResponse> {
		const command = new InitiateAuthCommand({
			AuthFlow: 'USER_PASSWORD_AUTH',
			ClientId: env.COGNITO_CLIENT_ID,
			AuthParameters: {
				USERNAME: email,
				PASSWORD: password
			}
		})

		try {
			const response = await this.client.send(command)

			const accessToken = response.AuthenticationResult?.AccessToken ?? ''
			const idToken = response.AuthenticationResult?.IdToken ?? ''
			const refreshToken = response.AuthenticationResult?.RefreshToken ?? ''

			return {
				accessToken,
				idToken,
				refreshToken
			}
		} catch (error: any) {
			if (error.name === 'NotAuthorizedException') {
				console.log('Usuário ou senha incorretos.')
			}

			if (error.name === 'UserNotFoundException') {
				console.log('Usuário não encontrado.')
			}

			throw error
		}
	}
}
