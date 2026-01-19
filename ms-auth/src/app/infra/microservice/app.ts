import { authenticateConsumer } from "./consumers/AuthenticateConsumer";
import { getUserConsumer } from "./consumers/GetUserConsumer";

async function bootstrap() {
	try {
		await Promise.all([authenticateConsumer(), getUserConsumer()]);

		console.log("MS-AUTH is running!! 🚀");
	} catch (error) {
		console.error("Error starting microservice:", error);

		process.exit(1);
	}
}

bootstrap();
