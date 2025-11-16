import { authenticateConsumer } from './consumers/AuthenticateConsumer'

async function bootstrap() {
	try {
		await Promise.all([authenticateConsumer()])

		console.log('MS-AUTH is running!! 🚀')
	} catch (error) {
		console.error('Error starting microservice:', error)

		process.exit(1)
	}
}

bootstrap()
