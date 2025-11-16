export interface QueuePublisher {
	publish(queueName: string, message: unknown): Promise<void>
}
