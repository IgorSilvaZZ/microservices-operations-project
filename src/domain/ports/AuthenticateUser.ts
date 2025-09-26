import { User } from '../entities/User'

export interface AuthenticateUserRequest {
	email: string
	password: string
}

export interface AuthenticateUser {
	authenticate(data: AuthenticateUserRequest): Promise<User>
}
