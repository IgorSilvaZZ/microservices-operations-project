export enum OrderStatusEnum {
	PENDING = "pending",
	PROCESSING = "processing",
	REPROVED = "reproved",
	APPROVED = "approved",
	FINISHED = "finished",
}

export interface Order {
	id: string;
	value: number;
	description: string;
	status: OrderStatusEnum;
	userId: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
