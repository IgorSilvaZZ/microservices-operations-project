import { randomUUID } from 'node:crypto'

import type { Profile } from './Profile'

export interface UserProps {
	id?: string
	name: string
	email: string
	password: string
	profileId: string
	subId: string
	profile: Profile | null // Pode ser nulo ja que nem sempre eu quero as informações do perfil
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export class User {
	private _id: string
	private _name: string
	private _email: string
	private _password: string
	private _profileId: string
	private _subId: string
	private _profile: Profile | null
	private _createdAt: Date
	private _updatedAt: Date
	private _deletedAt?: Date

	constructor(props: UserProps) {
		this._id = props.id ?? randomUUID()
		this._name = props.name
		this._email = props.email
		this._password = props.password
		this._profileId = props.profileId
		this._subId = props.subId
		this._profile = props.profile ?? null
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

	get profileId(): string {
		return this._profileId
	}

	get subId(): string {
		return this._subId
	}

	get profile(): Profile | null {
		return this._profile || null
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

	set profileId(newProfileId: string) {
		this._profileId = newProfileId

		this.syncUpdatedAt()
	}

	set profile(newProfile: Profile) {
		this._profile = newProfile

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
