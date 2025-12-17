export interface JwtPayload {
	sub: string;
	data?: Record<string, unknown>;
	cognitoAccessToken?: string;
	exp?: number;
}

export interface JwtProvider {
	generateToken(payload: JwtPayload): Promise<string>;
}
