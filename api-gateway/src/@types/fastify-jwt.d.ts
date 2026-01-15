import "@fastify/jwt";

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		payload: {
			sub: string;
			email: string;
			permissions: string[];
			cognitoAccessToken: string;
		};
	}
}
