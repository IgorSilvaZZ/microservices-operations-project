export interface QueueConsumer {
	listen(
		queueName: string,
		handler: (message: unknown) => Promise<void>
	): Promise<void>
}
