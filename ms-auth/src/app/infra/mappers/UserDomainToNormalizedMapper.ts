/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { User } from '@entities/User'

export class UserDomainToNormalizedMapper {
	static toNormalized(user: User) {
		const permissions = user.profile?.permissions.map((item) => item.name) || []

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			profileId: user.profileId,
			subId: user.subId,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			profile: user.profile?.description || '',
			permissions: permissions,
		}
	}
}
