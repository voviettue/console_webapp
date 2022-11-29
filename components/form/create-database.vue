<script lang="ts" setup>
import slugify from 'slugify'

const props = defineProps<{
	org: string
	loading?: boolean
}>()
const emit = defineEmits(['submit'])

interface DatabasePayload {
	org: string
	name: string
	instanceClass: string
	storageGB: number
}

const form = ref<DatabasePayload>({
	org: props.org,
	name: '',
	instanceClass: 'db.t3.small',
	storageGB: 5,
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
	<FormKit v-slot="{ state: { valid } }" type="form" autocomplete="off" :actions="false" @submit="onSubmit">
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
			<TwButton type="submit" :disabled="!valid || props.loading" :loading="props.loading">Create database</TwButton>
		</div>
	</FormKit>
</template>
