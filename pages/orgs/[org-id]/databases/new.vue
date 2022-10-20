<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/databases`" text="Databases" />
		</div>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Add a new database</h1>
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
			</div>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import slugify from 'slugify'

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
		navigateTo(`/orgs/${orgId}/databases`)
	} catch (err) {
		$toast.error({ title: 'Cannot create database', content: JSON.stringify(err.response.data) })
	}
	isCreatingDB.value = false
}
</script>
