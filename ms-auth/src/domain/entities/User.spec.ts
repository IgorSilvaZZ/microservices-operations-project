import { describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'

import { User } from './User'

describe('User Entity', () => {
	const userProps = {
		name: 'User Test',
		email: 'user@test.com',
		password: '123456',
		profileId: 'profile-id',
		subId: 'sub-id'
	}

	it('should be able to create a user', () => {
		const user = new User(userProps)

		expect(user).toBeTruthy()
		expect(user).toBeInstanceOf(User)
	})

	it('should be able to update user name', () => {
		const user = new User(userProps)

		const newName = 'New User Name'

		user.name = newName

		expect(user.name).toBe(newName)
	})

	it('should be able to update user profileId', () => {
		const user = new User(userProps)

		const newProfileId = randomUUID()

		user.profileId = newProfileId

		expect(user.profileId).toBe(newProfileId)
	})
})
