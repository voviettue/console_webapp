import { Status } from './shared'

export interface MySQLInstance {
	uid: string
	name: string
	status: Status[]
	storageGB: number
	instanceClass: string
	createdAt: string
}
