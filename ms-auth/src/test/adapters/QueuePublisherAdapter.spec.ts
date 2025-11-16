import { randomUUID } from 'node:crypto'
import { vi, afterEach, describe, it, beforeEach, expect } from 'vitest'

import { AuthenticateUserResponse } from '@ports/AuthenticateUser'

import { User } from '@domain/entities/User'
import { Profile } from '@domain/entities/Profile'
import { Permissions } from '@domain/entities/Permissions'

import { QueuePublisherFakeAdapter } from '@test/fakes/QueuePublisherFakeAdapter'

describe('QueuePublisherAdapter', () => {
	let queuePublisherFakeAdapter: QueuePublisherFakeAdapter

	beforeEach(() => {
		queuePublisherFakeAdapter = new QueuePublisherFakeAdapter()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should be able publisher message in queue authenticate response', async () => {
		const authenticateUserResponse: AuthenticateUserResponse = {
			user: new User({
				id: randomUUID(),
				name: 'Test User',
				email: 'user@test.com',
				password: 'hashed-password',
				profileId: randomUUID(),
				subId: randomUUID(),
				profile: new Profile({
					description: 'Profile Test',
					permissions: [
						new Permissions({ name: 'CREATE_ORDERS' }),
						new Permissions({ name: 'GET_ORDERS' }),
						new Permissions({ name: 'GET_OPERATIONS' })
					]
				})
			}),
			token: 'access-token'
		}

		const messagePublish = {
			success: true,
			data: authenticateUserResponse
		}

		await queuePublisherFakeAdapter.publish(
			'auth-response-queue',
			messagePublish
		)

		expect(queuePublisherFakeAdapter.publishMock).toHaveBeenCalledWith(
			'auth-response-queue',
			messagePublish
		)
		expect(queuePublisherFakeAdapter.publishMock).toHaveBeenCalledTimes(1)
		expect(queuePublisherFakeAdapter.publications).toHaveLength(1)
		expect(queuePublisherFakeAdapter.publications[0]).toEqual({
			queueUrl: 'auth-response-queue',
			correlationId: expect.any(String),
			success: true,
			data: messagePublish
		})
	})
})
