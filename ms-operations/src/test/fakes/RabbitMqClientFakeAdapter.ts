import type {
	ContentRpcMessage,
	QueueConsumerProps,
	RabbitMQClientPort,
} from "operations-package";
import { vi } from "vitest";

export class RabbitMQClientFakeAdapter implements RabbitMQClientPort {
	// biome-ignore lint/suspicious/noExplicitAny: <Aqui não importa qual tipo vai ser retornado>
	listen = vi.fn<(props: QueueConsumerProps) => Promise<any>>();

	publish = vi.fn<(queueName: string, message: unknown) => Promise<void>>();

	registerChannel = vi.fn<(channelName: string) => Promise<void>>();

	rpcCall =
		vi.fn<
			(
				queueName: string,
				// biome-ignore lint/suspicious/noExplicitAny: <Não é preciso saber qual tipo da mensagem retornada>
				message: any,
				timeoutMs?: number,
			) => Promise<ContentRpcMessage>
		>();
}
