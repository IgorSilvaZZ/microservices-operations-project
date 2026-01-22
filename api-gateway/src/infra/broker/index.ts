import { RabbitMQClient } from "operations-package";

import { env } from "../../env.ts";

export const broker = new RabbitMQClient({
	hostname: env.BROKER_URL,
	username: env.BROKER_USER,
	password: env.BROKER_PASSWORD,
});
