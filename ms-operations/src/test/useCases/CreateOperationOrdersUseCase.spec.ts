import { CreateOperationOrdersUseCase } from "@app/useCases/CreateOperationOrdersUseCase";
import { OperationRepositoryFakeAdapter } from "@test/fakes/OperationRepositoryFakeAdapter";
import { OperationsOrdersRepositoryFakeAdapter } from "@test/fakes/OperationsOrdersRepositoryFakeAdapter";
import { RabbitMQClientFakeAdapter } from "@test/fakes/RabbitMqClientFakeAdapter";
import { beforeEach, describe, it } from "vitest";

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

	it("should be able create operation with orders", () => {});
});
