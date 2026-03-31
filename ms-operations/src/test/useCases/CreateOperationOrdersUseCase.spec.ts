import { randomUUID } from "node:crypto";
import { CreateOperationOrdersUseCase } from "@app/useCases/CreateOperationOrdersUseCase";
import { Operation, OperationsStatusEnum } from "@domain/entities/Operation";
import { type Order, OrderStatusEnum } from "@domain/ports/Order";
import { OperationRepositoryFakeAdapter } from "@test/fakes/OperationRepositoryFakeAdapter";
import { OperationsOrdersRepositoryFakeAdapter } from "@test/fakes/OperationsOrdersRepositoryFakeAdapter";
import { RabbitMQClientFakeAdapter } from "@test/fakes/RabbitMqClientFakeAdapter";
import { AppError } from "operations-package";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create operation with orders", () => {
	let operationRepositoryInMemory: OperationRepositoryFakeAdapter;
	let operationsOrdersInMemory: OperationsOrdersRepositoryFakeAdapter;
	let rabbitMqClientFakeAdapter: RabbitMQClientFakeAdapter;

	let createOperationsOrdersUseCase: CreateOperationOrdersUseCase;

	beforeEach(() => {
		rabbitMqClientFakeAdapter = new RabbitMQClientFakeAdapter();

		operationRepositoryInMemory = new OperationRepositoryFakeAdapter();

		operationsOrdersInMemory = new OperationsOrdersRepositoryFakeAdapter();

		createOperationsOrdersUseCase = new CreateOperationOrdersUseCase(
			operationRepositoryInMemory,
			operationsOrdersInMemory,
			rabbitMqClientFakeAdapter,
		);
	});

	it("should be able create operation with orders", async () => {
		const orderIds: string[] = ["order-id-1", "order-id-2"];

		const userId = "user-id";

		const ordersUser: Order[] = [];

		for (const orderId of orderIds) {
			ordersUser.push({
				id: orderId,
				value: 500,
				description: "Order description",
				status: OrderStatusEnum.PENDING,
				userId: userId,
			});
		}

		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: ordersUser,
		});

		const { operationId } = await createOperationsOrdersUseCase.create({
			number: 1,
			orderIds,
			userId,
		});

		expect(operationRepositoryInMemory.operations).toHaveLength(1);
		expect(operationRepositoryInMemory.operations).toEqual([
			expect.objectContaining({ id: operationId }),
		]);
		expect(operationsOrdersInMemory.operationsOrders).toHaveLength(
			orderIds.length,
		);
		expect(operationsOrdersInMemory.operationsOrders).toEqual([
			expect.objectContaining({ operationId }),
			expect.objectContaining({ operationId }),
		]);
	});

	it("should be able create multiples operations with orders", async () => {
		for (let i = 1; i <= 5; i++) {
			const orderIds: string[] = [
				`order-${randomUUID()}`,
				`order-${randomUUID()}`,
			];

			const userId = `user-id-${i}`;

			const ordersUser: Order[] = [];

			for (const orderId of orderIds) {
				ordersUser.push({
					id: orderId,
					value: 500,
					description: "Order description",
					status: OrderStatusEnum.PENDING,
					userId: userId,
				});
			}

			rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
				success: true,
				data: ordersUser,
			});

			await createOperationsOrdersUseCase.create({
				number: i,
				orderIds,
				userId,
			});
		}

		expect(operationsOrdersInMemory.operationsOrders).toHaveLength(10);
	});

	it("should not be able create operation with number already exists", async () => {
		const orderIds: string[] = ["order-id-1", "order-id-2"];

		const userId = "user-id";

		const operation = new Operation({
			id: randomUUID(),
			number: 120,
			status: OperationsStatusEnum.PENDING,
			userId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		operationRepositoryInMemory.operations.push(operation);

		await expect(() => {
			return createOperationsOrdersUseCase.create({
				number: 120,
				orderIds,
				userId,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able create operation with order not exists", async () => {
		const orderIds: string[] = ["order-id-2"];

		const userId = "user-id";

		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: [
				{
					id: "order-id-1",
					value: 500,
					description: "Order description",
					status: OrderStatusEnum.PENDING,
					userId: userId,
				},
			],
		});

		await expect(() => {
			return createOperationsOrdersUseCase.create({
				number: 120,
				orderIds,
				userId,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
