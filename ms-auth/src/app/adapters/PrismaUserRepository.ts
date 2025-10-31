import { User } from '@domain/entities/User'

import { UserRepository } from '@domain/ports/UserRepository'

import { PrismaUserMapper } from '@mappers/PrismaUserMapper'

import { prisma } from '@app/infra/prisma'

export class PrismaUserRepository implements UserRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.users.findUnique({
			where: {
				id
			}
		})

		return user ? PrismaUserMapper.toDomain(user) : null
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.users.findUnique({
			where: {
				email
			}
		})

		return user ? PrismaUserMapper.toDomain(user) : null
	}

	async findByEmailWithPermissions(email: string): Promise<User | null> {
		// TODO continuar
		const user = await prisma.users.findUnique({
			where: { email: 'manager_dev@test.local' },
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
		})
	}
}
