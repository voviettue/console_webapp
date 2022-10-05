import { Status } from './shared'
import { Extension } from './extensions'

export interface Workspace {
	uid: string
	name: string
	domain: string
	subdomain: string
	status: Status[]
	extensions: Extension[]
}
