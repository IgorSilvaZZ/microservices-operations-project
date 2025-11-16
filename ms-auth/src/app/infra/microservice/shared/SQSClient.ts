import { SQSClient as AwsSQSClient } from '@aws-sdk/client-sqs'

// Classe auxiliar para gerenciar a instância do SQSClient
export class SQSClient extends AwsSQSClient {
	private static INSTANCE: SQSClient

	constructor() {
		super()
	}

	static getInstance(): SQSClient {
		if (!SQSClient.INSTANCE) {
			SQSClient.INSTANCE = new SQSClient()
		}

		return SQSClient.INSTANCE
	}
}
