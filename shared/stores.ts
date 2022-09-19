import { Status } from '@/types'

export function parseStatus(status): Status[] {
	return status.conditions.map((e) => ({
		reason: e.reason,
		status: e.status,
		type: e.type,
	}))
}
