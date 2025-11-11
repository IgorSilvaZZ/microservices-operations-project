import { Users as PrismaUsers, Prisma } from '@prisma/client'

import { User } from '@domain/entities/User'
import { Profile } from '@domain/entities/Profile'
import { Permissions } from '@domain/entities/Permissions'

import { UserWithProfilePermissions } from '../prisma/types/UserWithProfilePermissions'

export class PrismaUserMapper {
	static toDomainWithoutProfilePermissions(raw: PrismaUsers) {
		return new User({
			id: raw.id,
			name: raw.name,
			email: raw.email,
			password: raw.password,
			profileId: raw.profileId,
			subId: raw.subId,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
			profile: null
		})
	}

	static toDomainWithProfilePermissions(raw: UserWithProfilePermissions) {
		const profileRaw = raw.profile

		const permissions = profileRaw.profilePermissions.map(
			({ permission: permissionRaw }) => {
				return new Permissions({
					id: permissionRaw.id,
					name: permissionRaw.name,
					createdAt: permissionRaw.createdAt,
					updatedAt: permissionRaw.updatedAt
				})
			}
		)

		return new User({
			id: raw.id,
			name: raw.name,
			email: raw.email,
			password: raw.password,
			profileId: raw.profileId,
			subId: raw.subId,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
			profile: new Profile({
				id: profileRaw.id,
				description: profileRaw.description,
				permissions: permissions,
				createdAt: profileRaw.createdAt,
				updatedAt: profileRaw.updatedAt
			})
		})
	}
}
