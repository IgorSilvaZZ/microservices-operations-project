import { randomUUID } from "node:crypto";

import { AuthenticateUserUseCase } from "@app/useCases/AuthenticateUserUseCase";

import { Permissions } from "@entities/Permissions";
import { Profile } from "@entities/Profile";
import { User } from "@entities/User";

import type { AuthenticateUserRequest } from "@ports/AuthenticateUser";
import type { QueueConsumerProps } from "@ports/QueueConsumer";

import { AuthenticateProviderFakeAdapter } from "@test/fakes/AuthenticateProviderFakeAdapter";
import { BcryptPasswordHasherFakeAdapter } from "@test/fakes/BcryptPasswordHasherFakeAdapter";
import { QueueConsumerFakeAdapter } from "@test/fakes/QueueConsumerFakeAdapter";
import { UserRepositoryFakeAdapter } from "@test/fakes/UserRepositoryFakeAdapter";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Queue consumer", () => {
	let queueConsumerFakeAdapter: QueueConsumerFakeAdapter;

	let userRepositoryInMemory: UserRepositoryFakeAdapter;
	let bcryptPasswordHasherFakeAdapter: BcryptPasswordHasherFakeAdapter;
	let authenticateProviderFakeAdapter: AuthenticateProviderFakeAdapter;

	let authenticateUserUseCase: AuthenticateUserUseCase;

	beforeEach(() => {
		queueConsumerFakeAdapter = new QueueConsumerFakeAdapter();

		userRepositoryInMemory = new UserRepositoryFakeAdapter();
		bcryptPasswordHasherFakeAdapter = new BcryptPasswordHasherFakeAdapter();
		authenticateProviderFakeAdapter = new AuthenticateProviderFakeAdapter();

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
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be able use case authenticate user when receiver auth queue to reply request in queue", async () => {
		bcryptPasswordHasherFakeAdapter.compare.mockResolvedValue(true);
		authenticateProviderFakeAdapter.authenticate.mockResolvedValue({
			accessToken: "access-token",
			idToken: "id-token",
			refreshToken: "refresh-token",
		});

		authenticateUserUseCase = new AuthenticateUserUseCase(
			userRepositoryInMemory,
			bcryptPasswordHasherFakeAdapter,
			authenticateProviderFakeAdapter,
		);

		const spyAuthenticateUseCase = vi.spyOn(
			authenticateUserUseCase,
			"authenticate",
		);

		const messageAuthenticateQueue: AuthenticateUserRequest = {
			email: "user@test.com",
			password: "hashed-password",
		};

		const listenData: QueueConsumerProps = {
			queueName: "auth-queue",
			handler: async (message: unknown) => {
				return await authenticateUserUseCase.authenticate(
					message as AuthenticateUserRequest,
				);
			},
			toReply: true,
		};

		await queueConsumerFakeAdapter.listen(listenData);

		await queueConsumerFakeAdapter.simulateMessage(messageAuthenticateQueue);

		expect(spyAuthenticateUseCase).toHaveBeenCalledTimes(1);
		expect(spyAuthenticateUseCase).toHaveBeenCalledWith(
			messageAuthenticateQueue,
		);
		expect(queueConsumerFakeAdapter.sendToQueueMock).toHaveBeenCalledTimes(1);
	});
});
