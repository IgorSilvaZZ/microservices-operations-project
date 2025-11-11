import { User } from '@entities/User'

export class UserDomainToHttpMapper {
	static toHttp(user: User) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			profileId: user.profileId,
			subId: user.subId,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
			// TODO: continuar tipagem para retornar informações do perfil e permissões
		}
	}
}
