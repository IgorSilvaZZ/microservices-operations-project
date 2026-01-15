import { AuthenticateProviderAdapter } from "@adapters/AuthenticateProvider";
import { BcryptPasswordHasher } from "@adapters/BcryptPasswordHasher";
import { PrismaUserRepository } from "@adapters/PrismaUserRepository";
import { AuthenticateUserUseCase } from "@useCases/AuthenticateUserUseCase";
import { JwtProviderAdapter } from "operations-package";

export const makeAuthenticateUserUseCase = () => {
	const prismaUserRepository = new PrismaUserRepository();
	const bcryptPasswordHasher = new BcryptPasswordHasher();
	const authenticateProviderAdapter = new AuthenticateProviderAdapter();
	const jwtAdapter = new JwtProviderAdapter();

	const authenticateUserUseCase = new AuthenticateUserUseCase(
		prismaUserRepository,
		bcryptPasswordHasher,
		authenticateProviderAdapter,
		jwtAdapter,
	);

	return authenticateUserUseCase;
};
