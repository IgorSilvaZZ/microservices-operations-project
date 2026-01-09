import type { QueueConsumerProps } from "./QueueConsumerProps";

export interface RabbitMQClientPort {
	listen(props: QueueConsumerProps): Promise<any>;
	publish(queueName: string, message: unknown): Promise<void>;
}
