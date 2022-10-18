<template>
	<PageWrapper>
		<template #title:prepend>
			<button
				class="mr-2 p-2 inline-flex items-center rounded-full border border-transparent bg-indigo-100 p-1 text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="router.back()"
			>
				<ArrowLeftIcon class="w-4 h-4" />
			</button>
		</template>
		<template #title>New database</template>
		<TwCard class="mb-8 rounded-lg ring-black ring-1 ring-opacity-5">
			<FormKit
				v-slot="{ state: { valid } }"
				type="form"
				autocomplete="off"
				method="POST"
				:actions="false"
				@submit="submitHandler"
			>
				<div class="space-y-3">
					<FormKit
						v-model="form.name"
						label="Database Name"
						name="name"
						type="text"
						placeholder=""
						validation="required|length:3,20|matches:/^[0-9a-z](-?[0-9a-z])*$/"
					/>
					<FormKit
						v-model="form.instanceClass"
						label="Instance class"
						type="select"
						:options="[
							{ label: 'db.t3.small', value: 'db.t3.small' },
							{ label: 'db.t3.medium', value: 'db.t3.medium' },
							{ label: 'db.t3.large', value: 'db.t3.large' },
							{ label: 'db.t3.2xlarge', value: 'db.t3.2xlarge' },
						]"
					/>
					<FormKit
						v-model="form.storageGB"
						label="Storage"
						type="select"
						:options="[
							{ label: '5 Gb', value: 5 },
							{ label: '10 Gb', value: 10 },
							{ label: '15 Gb', value: 15 },
							{ label: '20 Gb', value: 20 },
							{ label: '50 Gb', value: 50 },
						]"
					/>
				</div>
				<div class="flex justify-end my-6">
					<TwButton type="submit" :disabled="!valid" :loading="isCreatingDB">Create database</TwButton>
				</div>
			</FormKit>
		</TwCard>
	</PageWrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import slugify from 'slugify'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

interface DatabasePayload {
	org: string
	name: string
	instanceClass: string
	storageGB: number
}

definePageMeta({
	title: 'New database',
	middleware: ['auth'],
})

const router = useRouter()
const route = useRoute()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const form = ref<DatabasePayload>({
	org: orgId,
	name: '',
	instanceClass: 'db.t3.small',
	storageGB: 5,
})
const isCreatingDB = ref(false)

watch(
	() => form.value.name,
	(newVal) => {
		form.value.name = slugify(newVal, { lower: true })
	}
)

async function submitHandler() {
	if (isCreatingDB.value) return
	isCreatingDB.value = true
	try {
		await $api.post(`/api/v1alpha1/orgs/${orgId}/mysqlinstances`, form.value)
		$toast.success({ title: 'Database has been created successfully!' })
		navigateTo(`/organizations/${orgId}`)
	} catch (err) {
		$toast.error({ title: 'Cannot create database', content: JSON.stringify(err.response.data) })
	}
	isCreatingDB.value = false
}
</script>
