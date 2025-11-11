import { describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'

import { User, UserProps } from './User'
import { Profile } from './Profile'
import { Permissions } from './Permissions'

describe('User Entity', () => {
	const userProps: UserProps = {
		name: 'User Test',
		email: 'user@test.com',
		password: '123456',
		profileId: 'profile-id',
		subId: 'sub-id',
		profile: new Profile({
			description: 'Profile Test',
			permissions: [
				new Permissions({ name: 'CREATE_ORDERS' }),
				new Permissions({ name: 'GET_ORDERS' }),
				new Permissions({ name: 'GET_OPERATIONS' })
			]
		})
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

	it('should be able to create user without profile', () => {
		const userWithoutProfile: UserProps = {
			name: 'User Test',
			email: 'user@test.com',
			password: '123456',
			profileId: 'profile-id',
			subId: 'sub-id',
			profile: null
		}

		const user = new User(userWithoutProfile)

		expect(user).toBeTruthy()
		expect(user).toBeInstanceOf(User)
	})
})
