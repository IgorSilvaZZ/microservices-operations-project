import { randomUUID } from 'node:crypto'

export interface PermissionsProps {
	id?: string
	name: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export class Permissions {
	private _id: string
	private _name: string
	private _createdAt: Date
	private _updatedAt: Date
	private _deletedAt?: Date

	constructor(props: PermissionsProps) {
		this._id = props.id ?? randomUUID()
		this._name = props.name
		this._createdAt = props.createdAt ?? new Date()
		this._updatedAt = props.updatedAt ?? new Date()
	}

	get id(): string {
		return this._id
	}

	get name(): string {
		return this._name
	}

	get createdAt(): Date {
		return this._createdAt
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	get deletedAt(): Date | undefined {
		return this._deletedAt
	}

	set name(value: string) {
		this._name = value

		this.syncUpdatedAt()
	}

	set deletedAt(value: Date | undefined) {
		this._deletedAt = value

		this.syncUpdatedAt()
	}

	private syncUpdatedAt() {
		this._updatedAt = new Date()
	}
}
