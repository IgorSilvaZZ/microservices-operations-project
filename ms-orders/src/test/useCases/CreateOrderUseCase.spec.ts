import { CreateOrderUseCase } from "@app/useCases/CreateOrderUseCase";
import { OrderStatusEnum } from "@domain/entities/Order";
import type { OrderCreateRequest } from "@domain/ports/OrderCreate";
import { OrderRepositoryFakeAdapter } from "@test/fakes/OrderRepositoryFakeAdapter";
import { RabbitMQClientFakeAdapter } from "@test/fakes/RabbitMqClientFakeAdapter";
import { AppError } from "operations-package";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create order", () => {
	let orderRepositoryInMemory: OrderRepositoryFakeAdapter;
	let rabbitMqClientFakeAdapter: RabbitMQClientFakeAdapter;

	let createOrderUseCase: CreateOrderUseCase;

	beforeEach(() => {
		orderRepositoryInMemory = new OrderRepositoryFakeAdapter();
		rabbitMqClientFakeAdapter = new RabbitMQClientFakeAdapter();

		createOrderUseCase = new CreateOrderUseCase(
			orderRepositoryInMemory,
			rabbitMqClientFakeAdapter,
		);
	});

	it("should be able create a order", async () => {
		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: { user: { id: "user-id" } },
		});

		const orderData: OrderCreateRequest = {
			value: 500,
			description: "Order description",
			status: OrderStatusEnum.PENDING,
			userId: "user-id",
		};

		const order = await createOrderUseCase.create(orderData);

		expect(order).toHaveProperty("id");
		expect(order.userId).toEqual("user-id");
	});

	it("should not be able create a order when user not found", async () => {
		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: { user: null },
		});

		const orderData: OrderCreateRequest = {
			value: 500,
			description: "Order description",
			status: OrderStatusEnum.PENDING,
			userId: "user-id",
		};

		await expect(() => {
			return createOrderUseCase.create(orderData);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able create multiples orders", async () => {
		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: { user: { id: "user-id" } },
		});

		await createOrderUseCase.create({
			value: 500,
			description: "Order 1 description",
			status: OrderStatusEnum.PENDING,
			userId: "user-id",
		});

		await createOrderUseCase.create({
			value: 200,
			description: "Order 2 description",
			status: OrderStatusEnum.PENDING,
			userId: "user-id",
		});

		expect(orderRepositoryInMemory.orders).toHaveLength(2);
		expect(orderRepositoryInMemory.orders).toEqual([
			expect.objectContaining({
				value: 500,
				description: "Order 1 description",
				status: OrderStatusEnum.PENDING,
			}),
			expect.objectContaining({
				value: 200,
				description: "Order 2 description",
				status: OrderStatusEnum.PENDING,
			}),
		]);
	});
});
