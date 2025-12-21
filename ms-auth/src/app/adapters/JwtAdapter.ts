import { env } from "@app/env";

import type { JwtPayload, JwtProvider } from "@domain/ports/JwtProvider";

import { sign } from "jsonwebtoken";

export class JwtAdapter implements JwtProvider {
	async generateToken(payload: JwtPayload): Promise<string> {
		const data = {
			...payload.data,
			cognitoAccessToken: payload.cognitoAccessToken,
		};

		try {
			const token = sign(data || {}, env.JWT_SECRET, {
				expiresIn: payload.exp || "1d",
				subject: payload.sub,
			});

			return token;
		} catch (error) {
			console.log("JwtAdapter error", error);

			throw new Error("Failed to generate token");
		}
	}
}
