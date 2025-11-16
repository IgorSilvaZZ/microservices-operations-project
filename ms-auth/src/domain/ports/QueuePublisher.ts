export interface QueuePublisher {
	publish(queueUrl: string, message: unknown): Promise<void>
}
