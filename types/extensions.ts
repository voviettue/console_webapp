export interface ExtensionMode {
	development: boolean
	tag: string
}

export interface Extension {
	name: string
	mode: ExtensionMode
	autoUpgrade: boolean
}
