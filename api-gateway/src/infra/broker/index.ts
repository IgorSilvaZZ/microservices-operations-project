import {
	AUTHENTICATE_QUEUE,
	GET_USER_QUEUE,
	RabbitMQClient,
} from "operations-package";

import { env } from "../../env.ts";

export const broker = new RabbitMQClient({
	hostname: env.BROKER_URL,
	username: env.BROKER_USER,
	password: env.BROKER_PASSWORD,
});

(async () => {
	await broker.registerChannel(AUTHENTICATE_QUEUE);
	await broker.registerChannel(GET_USER_QUEUE);
})();
