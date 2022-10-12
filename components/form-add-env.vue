<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { WorkspaceEnv } from '@/types'

type PropType = {
	modelValue: WorkspaceEnv[]
}

const props = defineProps<PropType>()
const emit = defineEmits(['update:modelValue'])
const form = ref([...props.modelValue])

function addNewEnvVariable() {
	form.value.push({ name: '', value: '' })
	emit('update:modelValue', form.value)
}

function removeEnvVariable(index: number) {
	form.value.splice(index, 1)
	emit('update:modelValue', form.value)
}
</script>

<template>
	<div>
		<div>
			<div v-for="(env, index) in form" :key="`env-${index}`" class="flex items-end space-x-2 mb-3">
				<div class="flex-1">
					<FormKit
						v-model="form[index].name"
						:label="index === 0 ? 'Key' : ''"
						type="text"
						placeholder="VARIABLE_NAME"
					/>
				</div>
				<div class="flex-1">
					<FormKit
						v-model="form[index].value"
						:label="index === 0 ? 'Value' : ''"
						type="text"
						placeholder="somevalue"
					/>
				</div>
				<TwButton type="button" variant="secondary" @click="removeEnvVariable(index)">
					<XCircleIcon class="w-5 h-5" />
				</TwButton>
			</div>
		</div>
		<TwButton type="button" variant="secondary" @click="addNewEnvVariable">New variable</TwButton>
	</div>
</template>
