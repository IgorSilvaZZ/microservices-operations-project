import { env } from "@app/env";
import type { JwtProvider } from "@domain/ports/JwtProvider";

import { verify } from "jsonwebtoken";

export class JwtAdapter implements JwtProvider {
	verifyToken(token: string): void {
		try {
			verify(token, env.JWT_SECRET);

			console.log("JwtAdapter - verifyToken Token is valid");
		} catch (error) {
			console.log("JwtAdapter - verifyToken error: ", error);

			throw new Error("Erro in verifying token!");
		}
	}
}
