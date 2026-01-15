export interface JwtPayload {
	sub: string;
	data?: Record<string, unknown>;
	cognitoAccessToken?: string;
	exp?: number;
}

export interface JwtProviderPort {
	generateToken(payload: JwtPayload): Promise<string>;
	verifyToken(token: string): void;
}
