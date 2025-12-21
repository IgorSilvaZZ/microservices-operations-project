export interface JwtProvider {
	verifyToken(token: string): void;
}
