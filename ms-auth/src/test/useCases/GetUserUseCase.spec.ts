import { randomUUID } from "node:crypto";
import { GetUserUseCase } from "@app/useCases/GetUserUseCase";
import { Permissions } from "@domain/entities/Permissions";
import { Profile } from "@domain/entities/Profile";
import { User } from "@domain/entities/User";
import { UserRepositoryFakeAdapter } from "@test/fakes/UserRepositoryFakeAdapter";
import { AppError } from "operations-package";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Get User Use Case", () => {
	let userRepositoryInMemory: UserRepositoryFakeAdapter;

	let getUserUseCase: GetUserUseCase;

	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryFakeAdapter();

		getUserUseCase = new GetUserUseCase(userRepositoryInMemory);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be able to get user by id", async () => {
		const spyFindById = vi.spyOn(userRepositoryInMemory, "findById");

		userRepositoryInMemory.users.push(
			new User({
				id: randomUUID(),
				name: "Test User",
				email: "user@test.com",
				password: "hashed-password",
				profileId: randomUUID(),
				subId: randomUUID(),
				profile: new Profile({
					description: "Profile Test",
					permissions: [
						new Permissions({ name: "CREATE_ORDERS" }),
						new Permissions({ name: "GET_ORDERS" }),
						new Permissions({ name: "GET_OPERATIONS" }),
					],
				}),
			}),
		);

		const idUser = userRepositoryInMemory.users[0].id;

		const { user } = await getUserUseCase.getUser({ id: idUser });

		expect(spyFindById).toBeCalledTimes(1);
		expect(spyFindById).toBeCalledWith(idUser);
		expect(user.id).toEqual(idUser);
	});

	it("should not be able to get user with not found user", async () => {
		const spyFindById = vi.spyOn(userRepositoryInMemory, "findById");

		await expect(() => {
			return getUserUseCase.getUser({ id: "invalid-id" });
		}).rejects.toBeInstanceOf(AppError);

		expect(spyFindById).toBeCalledTimes(1);
	});
});
