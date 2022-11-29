<script lang="ts" setup>
const props = defineProps<{
	loading?: boolean
}>()
const emit = defineEmits(['submit'])

const form = ref<{
	title: string
	description: string
	image: string
	package: string
}>({
	title: '',
	description: '',
	image: '',
	package: '',
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
			<FormKit v-model="form.package" label="Package name" type="text" validation="required" />
			<FormKit v-model="form.title" label="Title" type="text" placeholder="" validation="required" />
			<FormKit v-model="form.description" label="Description" type="textarea" placeholder="" validation="required" />
			<FormKit
				v-model="form.image"
				label="Image"
				type="url"
				placeholder="https://example.com/image.png"
				validation="required"
			/>
		</div>
		<div class="flex justify-end my-6">
			<TwButton type="submit" :disabled="!valid || props.loading" :loading="props.loading">Create</TwButton>
		</div>
	</FormKit>
</template>
