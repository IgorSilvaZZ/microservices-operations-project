import type { Operation } from "@domain/entities/Operation";
import type { OperationRepository } from "@domain/ports/OperationRepository";

export class OperationRepositoryFakeAdapter implements OperationRepository {
	public operations: Operation[] = [];

	async findByNumber(number: number): Promise<Operation | null> {
		return (
			this.operations.find((operation) => operation.number === number) ?? null
		);
	}

	async findByUserId(userId: string): Promise<Operation[]> {
		return this.operations.filter((operation) => operation.userId === userId);
	}
}
