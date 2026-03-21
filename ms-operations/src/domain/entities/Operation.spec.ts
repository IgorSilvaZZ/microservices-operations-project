import { describe, expect, it } from "vitest";

import {
	Operation,
	type OperationProps,
	OperationsStatusEnum,
} from "./Operation";

describe("Operation Entity", () => {
	const operationProps: OperationProps = {
		number: 12345,
		status: OperationsStatusEnum.PENDING,
		userId: "user-123",
	};

	it("should be able to create operation", () => {
		const operation = new Operation(operationProps);

		expect(operation).toBeTruthy();
		expect(operation).toBeInstanceOf(Operation);
	});

	it("should be able to update number", () => {
		const operation = new Operation(operationProps);

		const newNumber = 54321;

		operation.number = newNumber;

		expect(operation.number).toEqual(newNumber);
	});

	it("should be able to update status", () => {
		const operation = new Operation(operationProps);

		const newStatus = OperationsStatusEnum.PROCESSING;

		operation.status = newStatus;

		expect(operation.status).toEqual(newStatus);
	});
});
