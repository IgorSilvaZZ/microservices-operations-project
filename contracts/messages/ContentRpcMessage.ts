/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

export interface ContentRpcMessage {
	success: boolean;
	message?: string;
	data?: any;
	authContext?: any;
}
