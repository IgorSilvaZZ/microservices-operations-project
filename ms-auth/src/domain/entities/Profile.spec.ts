import { describe, expect, it } from 'vitest'

import { Profile } from './Profile'
import { Permissions } from './Permissions'

describe('Profile Entity', () => {
	it('should be able to create a user', () => {
		const permissionsProfile: Permissions[] = [
			new Permissions({ name: 'CREATE_ORDERS' }),
			new Permissions({ name: 'GET_ORDERS' }),
			new Permissions({ name: 'GET_OPERATIONS' })
		]

		const profile = new Profile({
			description: 'Profile Test',
			permissions: permissionsProfile
		})

		expect(profile).toBeTruthy()
		expect(profile).toBeInstanceOf(Profile)
	})
})
