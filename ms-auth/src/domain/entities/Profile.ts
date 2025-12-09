import { randomUUID } from 'node:crypto'

import type { Permissions } from './Permissions'

export interface ProfileProps {
	id?: string
	description: string
	permissions: Permissions[]
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export class Profile {
	private _id: string
	private _description: string
	private _permissions: Permissions[]
	private _createdAt: Date
	private _updatedAt: Date
	private _deletedAt?: Date

	constructor(props: ProfileProps) {
		this._id = props.id ?? randomUUID()
		this._description = props.description
		this._permissions = props.permissions
		this._createdAt = props.createdAt ?? new Date()
		this._updatedAt = props.updatedAt ?? new Date()
	}

	get id(): string {
		return this._id
	}

	get description(): string {
		return this._description
	}

	get permissions(): Permissions[] {
		return this._permissions
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

	set permissions(newPermissions: Permissions[]) {
		this._permissions = newPermissions

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
