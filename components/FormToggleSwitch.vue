<script lang="ts" setup>
const props = defineProps<{
	label?: string
	modelValue: boolean
}>()
const emits = defineEmits(['update:modelValue', 'input'])
const uid = `_cb_${getCurrentInstance().uid}`
const localValue = ref<boolean>(props.modelValue)

watch(
	() => props.modelValue,
	(newVal) => (localValue.value = newVal)
)

function onInput() {
	localValue.value = !localValue.value
	emits('update:modelValue', localValue.value)
	emits('input', localValue.value)
}
</script>

<template>
	<div>
		<label :for="uid" class="inline-flex relative items-center mb-4 cursor-pointer">
			<input :id="uid" type="checkbox" :checked="localValue" class="sr-only peer" @input="onInput" />
			<div
				class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"
			></div>
			<span class="ml-3 text-gray-700">{{ label }}</span>
		</label>
	</div>
</template>
