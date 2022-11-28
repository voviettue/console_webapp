import { defineStore } from 'pinia'
import gt from 'semver/functions/gt'
import lt from 'semver/functions/lt'
import valid from 'semver/functions/valid'
import { apiInstance } from '@/plugins/api'

export const useImagesStore = defineStore({
	id: 'imagesStore',
	state: () => {
		return {
			images: {},
		}
	},
	actions: {
		async getImages(repo: string) {
			try {
				const res = await apiInstance.get(`/api/meta/images/${repo}`)
				this.images[repo] = res.data.data.sort((a, b) => {
					if (!valid(a.tag) || !valid(b.tag)) return 0
					if (gt(a.tag, b.tag)) return -1
					if (lt(a.tag, b.tag)) return 1
					return 0
				})
			} catch (err) {
				throw new Error(err)
			}
		},
	},
})
