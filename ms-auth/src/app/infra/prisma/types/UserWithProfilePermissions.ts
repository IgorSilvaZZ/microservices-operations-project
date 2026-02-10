import type { Prisma } from "../";

export type UserWithProfilePermissions = Prisma.UsersGetPayload<{
	include: {
		profile: {
			include: {
				profilePermissions: {
					include: {
						permission: true;
					};
				};
			};
		};
	};
}>;
