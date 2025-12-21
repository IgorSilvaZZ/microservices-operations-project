import type { JwtProvider } from "@ports/JwtProvider";

import { vi } from "vitest";

export class JwtFakeAdapter implements JwtProvider {
	verifyToken = vi.fn<(token: string) => void>();
}
