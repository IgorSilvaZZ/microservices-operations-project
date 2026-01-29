import { describe, expect, it } from "vitest";

import { Order, type OrderProps, OrderStatusEnum } from "./Order";

describe("Order Entity", () => {
	const orderProps: OrderProps = {
		value: 500,
		description: "Order description",
		userId: "user-id",
		status: OrderStatusEnum.PENDING,
	};

	it("should be able to create order", async () => {
		const order = new Order(orderProps);

		expect(order).toBeTruthy();
		expect(order).toBeInstanceOf(Order);
	});

	it("should be able to update value", () => {
		const order = new Order(orderProps);

		const newValue = 500;

		order.value = newValue;

		expect(order.value).toEqual(newValue);
	});

	it("should be able to update description", async () => {
		const order = new Order(orderProps);

		const newDescription = "New order description";

		order.description = newDescription;

		expect(order.description).toEqual(newDescription);
	});
});
