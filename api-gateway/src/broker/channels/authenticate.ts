import { broker } from "../index.ts";

export const authenticateChannel = await broker.createChannel();

await authenticateChannel.assertQueue("authenticate_queue", { durable: true });
