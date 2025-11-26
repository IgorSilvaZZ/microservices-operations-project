import type { AuthenticateProvider } from "@ports/AuthenticateProvider";
import type {
	AuthenticateUser,
	AuthenticateUserRequest,
	AuthenticateUserResponse,
} from "@ports/AuthenticateUser";
import type { PasswordHasher } from "@ports/PasswordHasher";
import type { UserRepository } from "@ports/UserRepository";

export class AuthenticateUserUseCase implements AuthenticateUser {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private authenticationProvider: AuthenticateProvider,
	) {}

	async authenticate({
		email,
		password,
	}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const user = await this.userRepository.findByEmailWithPermissions(email);

		if (!user) {
			// TODO: create custom errors and change this instance
			throw new Error("User not found!");
		}

		if (!(await this.passwordHasher.compare(password, user.password))) {
			// TODO: create custom errors and change this instance
			throw new Error("Email/Password is incorrect!");
		}

		try {
			const { accessToken } = await this.authenticationProvider.authenticate(
				email,
				password,
			);

			return {
				user,
				token: accessToken,
			};
		} catch (error) {
			console.log(error);

			throw new Error("Error authenticate provider!");
		}
	}
}
