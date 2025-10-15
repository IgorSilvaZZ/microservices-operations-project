export interface AuthenticateProviderResponse {
	accessToken: string
	idToken: string
	refreshToken: string
}

export interface AuthenticateProvider {
	authenticate(
		email: string,
		password: string
	): Promise<AuthenticateProviderResponse>
}
