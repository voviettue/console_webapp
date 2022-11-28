export interface Preset {
	collection: string
	refreshInterval: number | null
	settings: Record<string, any> | null
}
