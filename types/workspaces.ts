import { Status } from './shared'

export interface Extension {
	name: string
	version: string
	isDev?: boolean
	autoUpgrade?: boolean
}

export interface Workspace {
	name: string
	domain: string
	subdomain: string
	status: Status[]
	extensions: Extension[]
}
