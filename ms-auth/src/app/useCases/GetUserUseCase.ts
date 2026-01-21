import { UserDomainToNormalizedMapper } from "@app/infra/mappers/UserDomainToNormalizedMapper";
import type { GetUser, GetUserRequest, GetUserResponse } from "@ports/GetUser";
import type { UserRepository } from "@ports/UserRepository";
import { AppError } from "operations-package";

export class GetUserUseCase implements GetUser {
	constructor(private userRepository: UserRepository) {}

	async getUser({ id }: GetUserRequest): Promise<GetUserResponse> {
		const user = await this.userRepository.findByIdWithPermissions(id);

		if (!user) {
			throw new AppError("User not found!");
		}

		return {
			user: UserDomainToNormalizedMapper.toNormalized(user),
		};
	}
}
