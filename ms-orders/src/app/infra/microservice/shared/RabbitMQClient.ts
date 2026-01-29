import { env } from "@app/env";
import { RabbitMQClient } from "operations-package";

export const rabbitMqQueueClient = new RabbitMQClient({
	hostname: env.RABBITMQ_URL,
	username: env.RABBITMQ_USER,
	password: env.RABBITMQ_PASSWORD,
});
