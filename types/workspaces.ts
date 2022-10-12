import { Status } from './shared'
import { Extension } from './extensions'

export interface WorkspaceEnv {
	name: string
	value: string
}

export interface WorkspaceWebapp {
	enabled: boolean
	version: string
}

export interface WorkspaceApp {
	adminEmail: string
	adminPaddword: string
	version: string
	env: WorkspaceEnv[]
}

export interface Workspace {
	uid: string
	name: string
	domain: string
	subdomain: string
	status: Status[]
	extensions: Extension[]
	app: WorkspaceApp
	webapp?: WorkspaceWebapp
}
