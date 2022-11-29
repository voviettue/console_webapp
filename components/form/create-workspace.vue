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
	installFromTpl: Record<string, any>
}

const form = ref<WorkspacePayload>({
	name: '',
	mysqlinstance: '',
	adminEmail: '',
	adminPassword: '',
	webappEnabled: false,
	installFromTpl: {
		enabled: false,
		s3Bucket: `${props.org}-templates`,
		name: '',
	},
})
const isShowAdvanced = ref(false)
const selectedTemplate = ref<Template>(null)

watch(
	() => form.value.name,
	(newVal) => {
		form.value.name = slugify(newVal, { lower: true })
	}
)

function onSubmit() {
	if (form.value.installFromTpl.enabled) {
		form.value.installFromTpl.name = selectedTemplate.value.name
	}
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
				placeholder=""
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
		<TwButton v-if="!isShowAdvanced" variant="secondary" class="my-4" @click="isShowAdvanced = true">
			Show advanced
		</TwButton>
		<template v-if="isShowAdvanced">
			<h3 class="text-xl font-medium my-4">Install from templates</h3>
			<FormKit v-model="form.installFromTpl.enabled" label="Install from templates" type="checkbox" />
			<FormSelectTemplate v-if="form.installFromTpl.enabled" v-model="selectedTemplate" class="my-4" />
		</template>
		<div class="flex justify-end my-6">
			<TwButton type="submit" :disabled="!valid" :loading="props.loading">Create Workspace</TwButton>
		</div>
	</FormKit>
</template>
