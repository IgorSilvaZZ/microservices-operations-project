import type {
	ContentRpcMessage,
	QueueConsumerProps,
	RabbitMQClientPort,
} from "operations-package";
import { vi } from "vitest";

export class RabbitMQClientFakeAdapter implements RabbitMQClientPort {
	listen = vi.fn<(props: QueueConsumerProps) => Promise<any>>();

	publish = vi.fn<(queueName: string, message: unknown) => Promise<void>>();

	registerChannel = vi.fn<(channelName: string) => Promise<void>>();

	rpcCall =
		vi.fn<
			(
				queueName: string,
				message: any,
				timeoutMs?: number,
			) => Promise<ContentRpcMessage>
		>();
}
