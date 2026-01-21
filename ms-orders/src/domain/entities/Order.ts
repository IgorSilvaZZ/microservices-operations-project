import { randomUUID } from "node:crypto";

export enum OrderStatusEnum {
	PENDING = "pending",
	PROCESSING = "processing",
	REPROVED = "reproved",
	APPROVED = "approved",
	FINISHED = "finished",
}

export interface OrderProps {
	id?: string;
	number: string;
	status: OrderStatusEnum;
	description: string;
	userId: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class Order {
	private _id: string;
	private _number: string;
	private _description: string;
	private _status: OrderStatusEnum = OrderStatusEnum.PENDING;
	private _userId: string;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(props: OrderProps) {
		this._id = props.id ?? randomUUID();
		this._number = props.number;
		this._description = props.description;
		this._status = props.status;
		this._userId = props.userId;
		this._createdAt = props.createdAt ?? new Date();
		this._updatedAt = props.updatedAt ?? new Date();
	}

	get id(): string {
		return this._id;
	}

	get number(): string {
		return this._number;
	}

	get description(): string {
		return this._description;
	}

	get status(): OrderStatusEnum {
		return this._status;
	}

	get userId(): string {
		return this._userId;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	get deletedAt(): Date | undefined {
		return this._deletedAt;
	}

	set number(newNumber: string) {
		this._number = newNumber;

		this.syncUpdatedAt();
	}

	set description(newDescription: string) {
		this._description = newDescription;

		this.syncUpdatedAt();
	}

	set status(newStatus: OrderStatusEnum) {
		this._status = newStatus;

		this.syncUpdatedAt();
	}

	set deletedAt(date: Date | undefined) {
		this._deletedAt = date;

		this.syncUpdatedAt();
	}

	private syncUpdatedAt() {
		this._updatedAt = new Date();
	}
}
