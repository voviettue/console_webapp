<script lang="ts" setup>
const props = defineProps<{
	loading?: boolean
}>()
const emit = defineEmits(['submit'])

const form = ref<{
	name: string
	title: string
	description: string
	org: string
	workspace: string
}>({
	name: '',
	title: '',
	description: '',
	org: '',
	workspace: '',
})
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
			<FormKit v-model="form.name" label="Name" type="text" validation="required" />
			<FormKit v-model="form.title" label="Title" type="text" placeholder="" validation="required" />
			<FormKit v-model="form.description" label="Description" type="textarea" placeholder="" validation="required" />
			<FormSelectWorkspace v-model:org="form.org" v-model:workspace="form.workspace" />
		</div>
		<div class="flex justify-end my-6">
			<TwButton type="submit" :disabled="!valid" :loading="props.loading">Create</TwButton>
		</div>
	</FormKit>
</template>
