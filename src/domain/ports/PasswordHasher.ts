export interface PasswordHasher {
	hash(password: string, hashed: string): Promise<string>
	compare(password: string, passwordHashed: string): Promise<boolean>
}
