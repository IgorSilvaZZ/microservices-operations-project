import { randomUUID } from "node:crypto";

import { Operation, type OperationProps } from "@domain/entities/Operation";
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

	async create(data: OperationProps): Promise<Operation> {
		const operation = new Operation({
			id: randomUUID(),
			number: data.number,
			status: data.status,
			userId: data.userId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		this.operations.push(operation);

		return operation;
	}
}
