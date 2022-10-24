import { Status } from './shared'

export interface Org {
	uid: string
	name: string
	status: Status[]
	createdAt: string
}
