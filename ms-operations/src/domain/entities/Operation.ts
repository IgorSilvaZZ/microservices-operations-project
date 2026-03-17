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

export interface OperationsProps {
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

	constructor(props: OperationsProps) {
		this._id = props.id ?? randomUUID();
		this._number = props.number;
		this._status = props.status;
		this._userId = props.userId;
		this._createdAt = props.createdAt ?? new Date();
		this._updatedAt = props.updatedAt ?? new Date();
	}
}
