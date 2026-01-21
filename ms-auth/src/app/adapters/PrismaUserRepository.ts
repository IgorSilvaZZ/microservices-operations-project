import { prisma } from "@app/infra/prisma";
import type { User } from "@domain/entities/User";
import type { UserRepository } from "@domain/ports/UserRepository";
import { PrismaUserMapper } from "@mappers/PrismaUserMapper";

export class PrismaUserRepository implements UserRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.users.findUnique({
			where: {
				id,
			},
		});

		return user
			? PrismaUserMapper.toDomainWithoutProfilePermissions(user)
			: null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});

		return user
			? PrismaUserMapper.toDomainWithoutProfilePermissions(user)
			: null;
	}

	async findByEmailWithPermissions(email: string): Promise<User | null> {
		const user = await prisma.users.findUnique({
			where: { email },
			include: {
				profile: {
					include: {
						profilePermissions: {
							include: {
								permission: true,
							},
						},
					},
				},
			},
		});

		return user ? PrismaUserMapper.toDomainWithProfilePermissions(user) : null;
	}

	async findByIdWithPermissions(id: string): Promise<User | null> {
		const user = await prisma.users.findUnique({
			where: { id },
			include: {
				profile: {
					include: {
						profilePermissions: {
							include: {
								permission: true,
							},
						},
					},
				},
			},
		});

		return user ? PrismaUserMapper.toDomainWithProfilePermissions(user) : null;
	}
}
