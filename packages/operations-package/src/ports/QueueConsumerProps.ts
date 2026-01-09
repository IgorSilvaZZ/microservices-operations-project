export interface QueueConsumerProps {
	queueName: string;
	handler: (message: unknown) => Promise<any>;
	toReply?: boolean;
}
