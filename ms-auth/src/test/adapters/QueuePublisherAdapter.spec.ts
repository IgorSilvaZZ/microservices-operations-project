import { randomUUID } from "node:crypto";

import type { AuthenticateUserResponse } from "@ports/AuthenticateUser";
import { QueuePublisherFakeAdapter } from "@test/fakes/QueuePublisherFakeAdapter";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("QueuePublisherAdapter", () => {
	let queuePublisherFakeAdapter: QueuePublisherFakeAdapter;

	beforeEach(() => {
		queuePublisherFakeAdapter = new QueuePublisherFakeAdapter();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be able publisher message in queue authenticate response", async () => {
		const authenticateUserResponse: AuthenticateUserResponse = {
			user: {
				id: randomUUID(),
				name: "Test User",
				email: "user@test.com",
				profileId: randomUUID(),
				permissions: ["CREATE_ORDERS", "GET_ORDERS", "GET_OPERATIONS"],
				profile: "Profile Test",
				subId: randomUUID(),
				updatedAt: new Date(),
				createdAt: new Date(),
			},
			token: "access-token",
		};

		const messagePublish = {
			data: authenticateUserResponse,
		};

		await queuePublisherFakeAdapter.publish(
			"auth-response-queue",
			messagePublish,
		);

		expect(queuePublisherFakeAdapter.publishMock).toHaveBeenCalledWith(
			"auth-response-queue",
			messagePublish,
		);
		expect(queuePublisherFakeAdapter.publishMock).toHaveBeenCalledTimes(1);
		expect(queuePublisherFakeAdapter.publications).toHaveLength(1);
		expect(queuePublisherFakeAdapter.publications[0]).toEqual({
			queueName: "auth-response-queue",
			data: messagePublish,
		});
	});
});
