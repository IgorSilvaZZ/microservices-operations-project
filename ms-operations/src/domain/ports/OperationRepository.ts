import type { Operation } from "@domain/entities/Operation";

export interface OperationRepository {
	findByNumber(number: number): Promise<Operation | null>;
	findByUserId(userId: string): Promise<Operation[]>;
}
