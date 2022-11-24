<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		step?: number
		min?: number
		max?: number
		modelValue: number
	}>(),
	{
		step: 1,
		min: 0,
		max: 1000,
	}
)
const emits = defineEmits(['update:modelValue', 'input'])
const localValue = ref<number>(props.modelValue)
watch(
	() => props.modelValue,
	(newVal) => (localValue.value = newVal)
)
function onInput(event: any) {
	localValue.value = Number(event.target.value)
	emits('update:modelValue', localValue.value)
	emits('input', localValue.value)
}
</script>
<template>
	<div class="w-full">
		<div class="w-full flex items-center gap-4">
			<div class="w-full relative">
				<input
					class="w-full"
					type="range"
					:step="props.step"
					:min="props.min"
					:max="props.max"
					:value="localValue"
					@input="onInput"
				/>
				<!--
				<div class="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
				<div class="absolute top-0 left-0 right-0 flex justify-between items-center">
					<div
						v-for="i in max"
						:key="i"
						:class="[
							'w-4 h-4 rounded-full',
							i + 1 < localValue ? 'bg-blue-600' : 'bg-gray-300',
							i + 1 === localValue ? 'bg-blue-600' : '',
						]"
					>
					</div>
				</div>
				!-->
			</div>
			<div class="w-[80px] text-center shrink-0 font-semibold border border-gray-200 rounded-md px-4 py-2">
				<span>{{ localValue }}</span>
			</div>
		</div>
	</div>
</template>
