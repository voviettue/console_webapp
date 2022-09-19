import { Status } from './shared'

export interface MySQLInstance {
	name: string
	status: Status[]
}
