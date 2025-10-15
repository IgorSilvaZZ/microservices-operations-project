import { describe, expect, it } from 'vitest'

import { Profile } from './Profile'

describe('Profile Entity', () => {
	it('should be able to create a user', () => {
		const profile = new Profile({
			description: 'Profile Test'
		})

		expect(profile).toBeTruthy()
		expect(profile).toBeInstanceOf(Profile)
	})
})
