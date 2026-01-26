/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type { ContentRpcMessage } from "./ContentRpcMessage";
import type { QueueConsumerProps } from "./QueueConsumerProps";

export interface RabbitMQClientPort {
	listen(props: QueueConsumerProps): Promise<any>;
	publish(queueName: string, message: unknown): Promise<void>;
	registerChannel(channelName: string): Promise<void>;
	rpcCall(
		queueName: string,
		message: any,
		timeoutMs?: number,
	): Promise<ContentRpcMessage>;
}
