import { createOrderConsumer } from "./consumers/CreateOrderConsumer";

async function bootstrap() {
	try {
		await Promise.all([createOrderConsumer()]);

		console.log("MS-ORDERS is running!! 🔥");
	} catch (error) {
		console.error("Error starting microservice: ", error);

		process.exit(1);
	}
}

bootstrap();
