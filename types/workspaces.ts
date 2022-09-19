import { Status } from './shared'

export interface Extension {
	name: string
	version: string
	isDev?: boolean
	autoUpgrade?: boolean
}

export interface Workspace {
	uid: string
	name: string
	domain: string
	subdomain: string
	status: Status[]
	extensions: Extension[]
}
