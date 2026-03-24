import type { Operation, OperationProps } from "@domain/entities/Operation";

export interface OperationRepository {
	findByNumber(number: number): Promise<Operation | null>;
	findByUserId(userId: string): Promise<Operation[]>;
	create(data: OperationProps): Promise<Operation>;
}
