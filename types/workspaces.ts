import { Status } from './shared'
import { Extension } from './extensions'

export interface WorkspaceEnv {
	name: string
	value: string
}

export interface WorkspaceWebapp {
	enabled: boolean
	version: string
	extVersion: string
}

export interface WorkspaceApp {
	adminEmail: string
	adminPaddword: string
	version: string
	chartVersion: string
	env: WorkspaceEnv[]
	size: number
}

export interface WorkspaceLedger {
	enabled: boolean
	version: string
	region: string
	status: string
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
	createdAt: string
	dbName: string
	snapshotEnabled: boolean
	deletionProtection: boolean
	org: string
	ledger: WorkspaceLedger
}
