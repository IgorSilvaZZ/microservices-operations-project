/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
export interface QueueConsumerProps {
	queueName: string;
	handler: (message: unknown) => Promise<any>;
	toReply?: boolean;
}

export interface QueueConsumer {
	listen(props: QueueConsumerProps): Promise<any>;
}
