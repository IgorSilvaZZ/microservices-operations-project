import { sign, verify } from "jsonwebtoken";

import type { JwtPayload, JwtProviderPort } from "../ports/JwtProviderPort";

import { JWT_SECRET } from "../shared/Consts";

export class JwtProviderAdapter implements JwtProviderPort {
	async generateToken(payload: JwtPayload): Promise<string> {
		const data = {
			...payload.data,
			cognitoAccessToken: payload.cognitoAccessToken,
		};

		try {
			const token = sign(data || {}, JWT_SECRET, {
				expiresIn: payload.exp || "1d",
				subject: payload.sub,
			});

			return token;
		} catch (error) {
			console.log("JwtAdapter error", error);

			throw new Error("Failed to generate token");
		}
	}

	verifyToken(token: string): void {
		try {
			verify(token, JWT_SECRET);

			console.log("JwtAdapter - verifyToken Token is valid");
		} catch (error) {
			console.log("JwtAdapter - verifyToken error: ", error);

			throw new Error("Erro in verifying token!");
		}
	}
}
