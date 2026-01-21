import { OrderDomainToNormalizedMapper } from "@app/infra/mappers/OrderDomainToNormalizedMapper";
import type {
	OrderCreate,
	OrderCreateRequest,
	OrderCreateResponse,
} from "@ports/OrderCreate";
import type { OrderRepository } from "@ports/OrderRepository";

export class CreateOrderUseCase implements OrderCreate {
	constructor(private orderRepository: OrderRepository) {}

	async create(data: OrderCreateRequest): Promise<OrderCreateResponse> {
		// TODO: Validar se o usuario existe (enviar para o microserviço ms-auth)
		// TODO: Implementar chamada RPC aqui, utilizando o adapter compartilhado (operations-package)

		// Criar order no banco de dados
		const order = await this.orderRepository.create(data);

		return OrderDomainToNormalizedMapper.toNormalized(order);
	}
}
