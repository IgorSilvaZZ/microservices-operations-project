import { ListOrdersByUserIdUseCase } from "@app/useCases/ListOrdersByUserIdUseCase";
import { OrderStatusEnum } from "@domain/entities/Order";
import { OrderRepositoryFakeAdapter } from "@test/fakes/OrderRepositoryFakeAdapter";
import { RabbitMQClientFakeAdapter } from "@test/fakes/RabbitMqClientFakeAdapter";
import { beforeEach, describe, expect, it } from "vitest";

describe("List orders by user", () => {
	let orderRepositoryInMemory: OrderRepositoryFakeAdapter;
	let rabbitMqClientFakeAdapter: RabbitMQClientFakeAdapter;

	let listOrdersByUserIdUseCase: ListOrdersByUserIdUseCase;

	beforeEach(() => {
		orderRepositoryInMemory = new OrderRepositoryFakeAdapter();
		rabbitMqClientFakeAdapter = new RabbitMQClientFakeAdapter();

		listOrdersByUserIdUseCase = new ListOrdersByUserIdUseCase(
			orderRepositoryInMemory,
			rabbitMqClientFakeAdapter,
		);
	});

	it("should be able list orders by user id", async () => {
		const userId = "user-id";

		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: { user: { id: userId } },
		});

		orderRepositoryInMemory.create({
			value: 500,
			description: "Order description",
			status: OrderStatusEnum.PENDING,
			userId: userId,
		});

		orderRepositoryInMemory.create({
			value: 200,
			description: "Order description 2",
			status: OrderStatusEnum.PROCESSING,
			userId: userId,
		});

		orderRepositoryInMemory.create({
			value: 400,
			description: "Order description 3",
			status: OrderStatusEnum.APPROVED,
			userId: userId,
		});

		orderRepositoryInMemory.create({
			value: 1000,
			description: "Order description",
			status: OrderStatusEnum.FINISHED,
			userId: "user-id-2",
		});

		const orders = await listOrdersByUserIdUseCase.execute({ userId, page: 1 });

		expect(orders).toHaveLength(3);
		expect(orders).toEqual([
			expect.objectContaining({
				description: "Order description",
				status: OrderStatusEnum.PENDING,
			}),
			expect.objectContaining({
				description: "Order description 2",
				status: OrderStatusEnum.PROCESSING,
			}),
			expect.objectContaining({
				description: "Order description 3",
				status: OrderStatusEnum.APPROVED,
			}),
		]);
		expect(orders).not.toEqual([
			expect.objectContaining({
				description: "Order description",
				status: OrderStatusEnum.FINISHED,
			}),
		]);
		expect(rabbitMqClientFakeAdapter.rpcCall).toBeCalledTimes(1);
	});

	it("should be able list paginate orders by user with status filter", async () => {
		const userId = "user-id";

		rabbitMqClientFakeAdapter.rpcCall.mockResolvedValue({
			success: true,
			data: { user: { id: userId } },
		});

		orderRepositoryInMemory.create({
			value: 500,
			description: "Order description",
			status: OrderStatusEnum.PENDING,
			userId: userId,
		});

		orderRepositoryInMemory.create({
			value: 200,
			description: "Order description 2",
			status: OrderStatusEnum.PENDING,
			userId: userId,
		});

		orderRepositoryInMemory.create({
			value: 400,
			description: "Order description 3",
			status: OrderStatusEnum.APPROVED,
			userId: userId,
		});

		const orders = await listOrdersByUserIdUseCase.execute({
			userId,
			status: OrderStatusEnum.PENDING,
			page: 1,
		});

		expect(orders).toHaveLength(2);
		expect(orders).toEqual([
			expect.objectContaining({
				description: "Order description",
				status: OrderStatusEnum.PENDING,
			}),
			expect.objectContaining({
				description: "Order description 2",
				status: OrderStatusEnum.PENDING,
			}),
		]);
	});
});
