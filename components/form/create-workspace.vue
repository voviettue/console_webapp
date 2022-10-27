<script lang="ts" setup>
import slugify from 'slugify'

const props = defineProps<{
	org: string
	loading?: boolean
}>()
const emit = defineEmits(['submit'])

interface WorkspacePayload {
	name: string
	mysqlinstance: string
	adminEmail: string
	adminPassword: string
	webappEnabled: boolean
}

const form = ref<WorkspacePayload>({
	name: '',
	mysqlinstance: '',
	adminEmail: '',
	adminPassword: '',
	webappEnabled: false,
})

watch(
	() => form.value.name,
	(newVal) => {
		form.value.name = slugify(newVal, { lower: true })
	}
)

function onSubmit() {
	emit('submit', form.value)
}
</script>
<template>
	<FormKit
		v-slot="{ state: { valid } }"
		type="form"
		autocomplete="off"
		method="POST"
		:actions="false"
		@submit="onSubmit"
	>
		<div class="space-y-3">
			<FormKit
				v-model="form.name"
				label="Workspace Name"
				name="name"
				type="text"
				placeholder="Example"
				validation="required|length:3,20|matches:/^[0-9a-z](-?[0-9a-z])*$/"
			/>
			<FormSelectMysqlInstances
				v-model="form.mysqlinstance"
				label="Database"
				name="mysqlinstance"
				placeholder="Select a MySQL instance"
				validation="required"
				:org="props.org"
			/>
		</div>
		<Divider class="my-4" label="App information" />
		<div class="space-y-3">
			<FormKit
				v-model="form.adminEmail"
				label="Admin email"
				name="adminEmail"
				type="email"
				placeholder="admin@example.com"
				validation="required|email"
			/>
			<FormKit
				v-model="form.adminPassword"
				label="Admin password"
				name="adminPassword"
				type="password"
				placeholder=""
				validation="required"
			/>
		</div>
		<Divider class="my-4" label="Front-office" />
		<div class="space-y-3">
			<FormKit v-model="form.webappEnabled" label="Enable front-office" name="webappEnabled" type="checkbox" />
		</div>
		<div class="flex justify-end my-6">
			<TwButton type="submit" :disabled="!valid" :loading="props.loading">Create Workspace</TwButton>
		</div>
	</FormKit>
</template>
