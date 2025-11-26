import type { User } from "../entities/User";

export interface AuthenticateUserRequest {
	email: string;
	password: string;
}

export interface AuthenticateUserResponse {
	user: User;
	token: string;
}

export interface AuthenticateUser {
	authenticate(
		data: AuthenticateUserRequest,
	): Promise<AuthenticateUserResponse>;
}
