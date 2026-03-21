import { randomUUID } from "node:crypto";

export enum OperationsStatusEnum {
	PENDING = "pending",
	PROCESSING = "processing",
	MANAGER_APPROVE = "manager_approve",
	FINANCIAL_APPROVE = "financial_approve",
	PAID = "paid",
	FINANCIAL_REPROVE = "financial_reprove",
	MANAGER_REPROVE = "manager_reprove",
}

export interface OperationProps {
	id?: string;
	number: number;
	status: OperationsStatusEnum;
	userId: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class Operation {
	private _id: string;
	private _number: number;
	private _status: OperationsStatusEnum = OperationsStatusEnum.PENDING;
	private _userId: string;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(props: OperationProps) {
		this._id = props.id ?? randomUUID();
		this._number = props.number;
		this._status = props.status;
		this._userId = props.userId;
		this._createdAt = props.createdAt ?? new Date();
		this._updatedAt = props.updatedAt ?? new Date();
	}

	get id(): string {
		return this._id;
	}

	get number(): number {
		return this._number;
	}

	get status(): OperationsStatusEnum {
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

	set number(newNumber: number) {
		this._number = newNumber;

		this.syncUpdatedAt();
	}

	set status(newStatus: OperationsStatusEnum) {
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
