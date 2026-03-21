import { randomUUID } from "node:crypto";

export interface OperationsOrdersProps {
	id?: string;
	operationId: string;
	orderId: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class OperationsOrders {
	private _id: string;
	private _operationId: string;
	private _orderId: string;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(props: OperationsOrdersProps) {
		this._id = props.id ?? randomUUID();
		this._operationId = props.operationId;
		this._orderId = props.orderId;
		this._createdAt = props.createdAt ?? new Date();
		this._updatedAt = props.updatedAt ?? new Date();
		this._deletedAt = props.deletedAt;
	}

	get id(): string {
		return this._id;
	}

	get operationId(): string {
		return this._operationId;
	}

	get orderId(): string {
		return this._orderId;
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

	set deletedAt(date: Date | undefined) {
		this._deletedAt = date;

		this.syncUpdatedAt();
	}

	private syncUpdatedAt() {
		this._updatedAt = new Date();
	}
}
