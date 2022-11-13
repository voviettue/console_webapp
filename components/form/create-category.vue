<script lang="ts" setup>
import slugify from 'slugify'

const props = defineProps<{
	loading?: boolean
}>()
const emit = defineEmits(['submit'])

interface FormPayload {
	name: string
	title: string
}

const form = ref<FormPayload>({
	name: '',
	title: '',
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
		<div class="space-y-3 mb-6">
			<FormKit
				v-model="form.name"
				label="Name"
				name="name"
				type="text"
				placeholder=""
				validation="required|length:3,20|matches:/^[0-9a-z](-?[0-9a-z])*$/"
			/>
			<FormKit v-model="form.title" label="Title" name="title" type="text" placeholder="" validation="required" />
		</div>
		<div class="flex justify-end">
			<TwButton type="submit" :disabled="!valid" :loading="props.loading">Create</TwButton>
		</div>
	</FormKit>
</template>
