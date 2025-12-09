import type { Prisma } from '@prisma/client'

export type UserWithProfilePermissions = Prisma.UsersGetPayload<{
	include: {
		profile: {
			include: {
				profilePermissions: {
					include: {
						permission: true
					}
				}
			}
		}
	}
}>
