import type { FastifyInstance } from "fastify";
import { PermissionsEnum } from "../../../../shared/enums/Permissions.enum";
import { verifyJwt } from "../../middlewares/verify-jwt.middleware";
import { verifyPermission } from "../../middlewares/verify-permissions.middleware";
import { create } from "./create.controller";

export function ordersRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJwt);

	app.post(
		"/orders",
		{ onRequest: [verifyPermission(PermissionsEnum.CREATE_ORDERS)] },
		create,
	);
}
