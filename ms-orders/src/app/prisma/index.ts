import { env } from "@app/env";

import { PrismaClient } from "../../../prisma/generated/prisma";

export const prisma = new PrismaClient({
	log: env.NODE_ENV === "dev" ? ["query"] : [],
});

export * from "../../../prisma/generated/prisma";
