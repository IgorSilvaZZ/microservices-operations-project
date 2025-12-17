import { UserDomainToNormalizedMapper } from "@app/infra/mappers/UserDomainToNormalizedMapper";
import { AppError } from "@app/shared/AppErrors";
import type { AuthenticateProvider } from "@ports/AuthenticateProvider";
import type {
	AuthenticateUser,
	AuthenticateUserRequest,
	AuthenticateUserResponse,
} from "@ports/AuthenticateUser";
import type { JwtProvider } from "@ports/JwtProvider";
import type { PasswordHasher } from "@ports/PasswordHasher";
import type { UserRepository } from "@ports/UserRepository";

export class AuthenticateUserUseCase implements AuthenticateUser {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private authenticationProvider: AuthenticateProvider,
		private jwtProvider: JwtProvider,
	) {}

	async authenticate({
		email,
		password,
	}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const user = await this.userRepository.findByEmailWithPermissions(email);

		if (!user) {
			// TODO: create custom errors and change this instance
			throw new AppError("User not found!");
		}

		if (!(await this.passwordHasher.compare(password, user.password))) {
			// TODO: create custom errors and change this instance
			throw new AppError("Email/Password is incorrect!");
		}

		try {
			const { accessToken } = await this.authenticationProvider.authenticate(
				email,
				password,
			);

			this.jwtProvider.generateToken({
				sub: user.id,
				cognitoAccessToken: accessToken,
			});

			return {
				user: UserDomainToNormalizedMapper.toNormalized(user),
				token: accessToken,
			};
		} catch (error) {
			console.log(error);

			throw new AppError("Error authenticate provider!");
		}
	}
}
