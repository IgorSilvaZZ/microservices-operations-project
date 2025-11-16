export interface QueueConsumer {
	listen(
		queueUrl: string,
		handler: (message: unknown) => Promise<void>
	): Promise<void>
}
