import { PrismaUserRepository } from "@adapters/PrismaUserRepository";

import { GetUserUseCase } from "@useCases/GetUserUseCase";

export const makeGetUserUseCase = () => {
	const prismaUserRepository = new PrismaUserRepository();

	const getUserUseCase = new GetUserUseCase(prismaUserRepository);

	return getUserUseCase;
};
