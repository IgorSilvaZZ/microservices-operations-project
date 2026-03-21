import { describe, expect, it } from "vitest";

import {
	OperationsOrders,
	type OperationsOrdersProps,
} from "./OperationsOrders";

describe("OperationsOrders Entity", () => {
	const operationsOrdersProps: OperationsOrdersProps = {
		operationId: "operation-123",
		orderId: "order-456",
	};

	it("should be able to create operations orders", () => {
		const operationsOrders = new OperationsOrders(operationsOrdersProps);

		expect(operationsOrders).toBeTruthy();
		expect(operationsOrders).toBeInstanceOf(OperationsOrders);
	});
});
