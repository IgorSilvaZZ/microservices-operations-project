import { AuthenticateProviderAdapter } from "@adapters/AuthenticateProvider";
import { BcryptPasswordHasher } from "@adapters/BcryptPasswordHasher";
import { PrismaUserRepository } from "@adapters/PrismaUserRepository";
import { JwtAdapter } from "@app/adapters/JwtAdapter";

import { AuthenticateUserUseCase } from "@useCases/AuthenticateUserUseCase";

export const makeAuthenticateUserUseCase = () => {
	const prismaUserRepository = new PrismaUserRepository();
	const bcryptPasswordHasher = new BcryptPasswordHasher();
	const authenticateProviderAdapter = new AuthenticateProviderAdapter();
	const jwtAdapter = new JwtAdapter();

	const authenticateUserUseCase = new AuthenticateUserUseCase(
		prismaUserRepository,
		bcryptPasswordHasher,
		authenticateProviderAdapter,
		jwtAdapter,
	);

	return authenticateUserUseCase;
};
