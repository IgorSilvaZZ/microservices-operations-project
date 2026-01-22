import { broker } from "../index.ts";

await broker.registerChannel("authenticate_queue");
await broker.registerChannel("get_user_queue");
