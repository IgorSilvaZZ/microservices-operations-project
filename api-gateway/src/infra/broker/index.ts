import { connect } from "amqplib";

import { env } from "../env.ts";

export const broker = await connect({
	hostname: env.BROKER_URL,
	username: env.BROKER_USER,
	password: env.BROKER_PASSWORD,
});
