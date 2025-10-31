import { randomUUID } from 'node:crypto'

export interface ProfilePermissionsProps {
	id?: string
	profileId: string
	permissionId: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export class ProfilePermissions {
	private _id: string
	private _profileId: string
	private _permissionId: string
	private _createdAt: Date
	private _updatedAt: Date
	private _deletedAt?: Date

	constructor(props: ProfilePermissionsProps) {
		this._id = props.id ?? randomUUID()
		this._profileId = props.profileId
		this._permissionId = props.permissionId
		this._createdAt = props.createdAt ?? new Date()
		this._updatedAt = props.updatedAt ?? new Date()
	}

	get id(): string {
		return this._id
	}

	get profileId(): string {
		return this._profileId
	}

	get permissionId(): string {
		return this._permissionId
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

	set profileId(value: string) {
		this._profileId = value

		this.syncUpdatedAt()
	}

	set permissionId(value: string) {
		this._permissionId = value

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
