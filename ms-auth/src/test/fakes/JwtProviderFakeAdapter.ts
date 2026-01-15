import type { JwtPayload, JwtProviderPort } from "operations-package";
import { vi } from "vitest";

export class JwtProviderFakeAdapter implements JwtProviderPort {
	generateToken = vi.fn<(payload: JwtPayload) => Promise<string>>();
	verifyToken = vi.fn<(token: string) => void>();
}
