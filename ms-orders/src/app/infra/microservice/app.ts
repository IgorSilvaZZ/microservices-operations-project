import { createOrderConsumer } from "./consumers/CreateOrderConsumer";
import { listOrderByUserIdConsumer } from "./consumers/ListOrdersByUserIdConsumer";

async function bootstrap() {
	try {
		await Promise.all([createOrderConsumer(), listOrderByUserIdConsumer()]);

		console.log("MS-ORDERS is running!! 🔥");
	} catch (error) {
		console.error("Error starting microservice: ", error);

		process.exit(1);
	}
}

bootstrap();
