import { broker } from "../index.ts";

export const authenticateChannel = await broker.createChannel();

export const getUserChannel = await broker.createChannel();

await Promise.all([
	authenticateChannel.assertQueue("authenticate_queue", { durable: true }),
	getUserChannel.assertQueue("get_user_queue", { durable: true }),
]);
