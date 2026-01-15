export interface AuthenticateUserRequest {
	email: string;
	password: string;
}

export interface AuthenticateUserResponse {
	user: {
		id: string;
		name: string;
		email: string;
		profileId: string;
		subId: string;
		createdAt: Date;
		updatedAt: Date;
		profile: string;
		permissions: string[];
	};
	cognitoAccessToken: string;
}

export interface AuthenticateUser {
	authenticate(
		data: AuthenticateUserRequest,
	): Promise<AuthenticateUserResponse>;
}
