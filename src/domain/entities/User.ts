import { randomUUID } from 'node:crypto'

export interface UserProps {
	id?: string
	name: string
	email: string
	password: string
	subId: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export class User {
	private _id: string
	private _name: string
	private _email: string
	private _password: string
	private _subId: string
	private _createdAt: Date
	private _updatedAt: Date
	private _deletedAt?: Date

	constructor(props: UserProps) {
		this._id = props.id ?? randomUUID()
		this._name = props.name
		this._email = props.email
		this._password = props.password
		this._subId = props.subId
		this._createdAt = props.createdAt ?? new Date()
		this._updatedAt = props.updatedAt ?? new Date()
	}

	get id(): string {
		return this._id
	}

	get name(): string {
		return this._name
	}

	get email(): string {
		return this._email
	}

	get password(): string {
		return this._password
	}

	get subId(): string {
		return this._subId
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

	set name(newName: string) {
		this._name = newName

		this.syncUpdatedAt()
	}

	set email(newEmail: string) {
		this._email = newEmail

		this.syncUpdatedAt()
	}

	set password(newPassword: string) {
		this._password = newPassword

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
