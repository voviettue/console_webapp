export interface ExtensionCodeActifactVersion {
	revision: string
	version: string
}

export interface Extension {
	id: string
	title: string
	description: string
	image: string
	package: string
	namespace: string
	defaultDisplayVersion: string
	versions: ExtensionCodeActifactVersion[]
	syncedAt: string
	updatedAt: string
}
