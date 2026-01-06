export interface QueueConsumerProps {
	queueName: string;
	handler: (message: unknown) => Promise<any>;
	toReply?: boolean;
}

export interface RabbitMQClientPort {
	listen(props: QueueConsumerProps): Promise<any>;
	publish(queueName: string, message: unknown): Promise<void>;
}
