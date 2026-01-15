import { UserDomainToNormalizedMapper } from "@app/infra/mappers/UserDomainToNormalizedMapper";
import { AppError } from "@app/shared/AppErrors";
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
			throw new AppError("User not found!");
		}

		if (!(await this.passwordHasher.compare(password, user.password))) {
			throw new AppError("Email/Password is incorrect!");
		}

		try {
			const { accessToken } = await this.authenticationProvider.authenticate(
				email,
				password,
			);

			return {
				user: UserDomainToNormalizedMapper.toNormalized(user),
				cognitoAccessToken: accessToken,
			};
		} catch (error) {
			console.log(error);

			throw new AppError("Error authenticate provider!");
		}
	}
}
