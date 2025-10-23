import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createProfiles() {
	const profiles: Prisma.ProfileCreateInput[] = [
		{ description: 'Worker' },
		{ description: 'Manager' },
		{ description: 'Finance' }
	]

	await prisma.profile.createMany({
		data: profiles
	})
}

async function createPermissions() {
	const permissions: Prisma.PermissionsCreateInput[] = [
		{ name: 'CREATE_ORDERS' },
		{ name: 'CREATE_OPERATIONS' },
		{ name: 'GET_ORDERS' },
		{ name: 'GET_OPERATIONS' },
		{ name: 'APPROVE_OPERATION' },
		{ name: 'REJECT_OPERATION' }
	]

	await prisma.permissions.createMany({
		data: permissions
	})
}

async function createUsers() {
	const users = [
		{
			name: 'Worker Dev',
			username: 'worker_dev',
			email: 'worker_dev@test.local',
			password: 'Senha@2025',
			subId: 'f438f4c8-3011-705a-394a-23695364a272',
			group: 'Worker',
			permissions: [
				'CREATE_ORDERS',
				'CREATE_OPERATIONS',
				'GET_ORDERS',
				'GET_OPERATIONS'
			]
		},
		{
			name: 'Manager Dev',
			username: 'manager_dev',
			email: 'manager_dev@test.local',
			password: 'Senha@2025',
			subId: 'a4185488-a011-70e5-9a9e-dd6108f2b0ce',
			group: 'Manager',
			permissions: ['GET_OPERATIONS', 'APPROVE_OPERATION', 'REJECT_OPERATION']
		},
		{
			name: 'Finance Dev',
			username: 'finance_dev',
			email: 'finance_dev@test.local',
			password: 'Senha@2025',
			subId: '9488b478-2051-705b-2506-35b708047d66',
			group: 'Finance',
			permissions: ['GET_OPERATIONS', 'APPROVE_OPERATION', 'REJECT_OPERATION']
		}
	]

	for (const user of users) {
		const profile = await prisma.profile.findFirst({
			where: { description: user.group }
		})

		if (!profile) {
			throw new Error(`Profile not found: ${user.group}`)
		}

		const hashedPassword = await bcrypt.hash(user.password, 10)

		const userData: Prisma.UsersUncheckedCreateInput = {
			name: user.name,
			email: user.email,
			password: hashedPassword,
			profileId: profile.id,
			subId: user.subId
		}

		try {
			await prisma.users.create({
				data: userData
			})

			for (const permissionName of user.permissions) {
				const permission = await prisma.permissions.findFirst({
					where: { name: permissionName }
				})

				if (!permission) {
					throw new Error(`Permission not found: ${permissionName}`)
				}

				const permissionProfileData: Prisma.ProfilePermissionsUncheckedCreateInput =
					{
						permissionId: permission.id,
						profileId: profile.id
					}

				await prisma.profilePermissions.create({
					data: permissionProfileData
				})
			}
		} catch (error) {
			console.log(error)

			console.log('error creating user:', user.name)

			throw error
		}

		console.log('User Created ✅', user.name)
	}
}

async function main() {
	await createProfiles()

	await createPermissions()

	await createUsers()
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)

		await prisma.$disconnect()

		process.exit(1)
	})
