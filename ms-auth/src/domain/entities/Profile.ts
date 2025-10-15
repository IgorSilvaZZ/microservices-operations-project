import { randomUUID } from 'node:crypto'

export interface ProfileProps {
	id?: string
	description: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export class Profile {
	private _id: string
	private _description: string
	private _createdAt: Date
	private _updatedAt: Date
	private _deletedAt?: Date

	constructor(props: ProfileProps) {
		this._id = props.id ?? randomUUID()
		this._description = props.description
		this._createdAt = props.createdAt ?? new Date()
		this._updatedAt = props.updatedAt ?? new Date()
	}

	get id(): string {
		return this._id
	}

	get description(): string {
		return this._description
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

	set description(newDescription: string) {
		this._description = newDescription

		this.syncUpdatedAt()
	}

	set deletedAt(date: Date | undefined) {
		this._deletedAt = date

		this.syncUpdatedAt()
	}

	private syncUpdatedAt() {
		this._updatedAt = new Date()
	}
}
