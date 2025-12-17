import type { JwtPayload, JwtProvider } from "@ports/JwtProvider";
import { vi } from "vitest";

export class JwtProviderFakeAdapter implements JwtProvider {
	generateToken = vi.fn<(payload: JwtPayload) => Promise<string>>();
}
