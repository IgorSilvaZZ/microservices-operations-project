import { Users as PrismaUsers } from '@prisma/client'

import { User } from '@domain/entities/User'

export class PrismaUserMapper {
	static toDomain(raw: PrismaUsers) {
		return new User({
			id: raw.id,
			name: raw.name,
			email: raw.email,
			password: raw.password,
			profileId: raw.profileId,
			subId: raw.subId,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt
		})
	}
}
