export interface GetUserRequest {
	id: string;
}

export interface GetUserResponse {
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
}

export interface GetUser {
	getUser(data: GetUserRequest): Promise<GetUserResponse>;
}
