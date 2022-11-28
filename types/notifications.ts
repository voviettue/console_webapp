export type Notification = {
	id: string | number
	type: 'success' | 'error'
	title: string
	content?: string
	error?: Record<string, any>
}
