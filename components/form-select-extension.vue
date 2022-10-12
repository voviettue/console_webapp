<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { Extension } from '@/types'
type PropType = {
	name: string
	title: string
	description?: string
	checked?: boolean
	hideButton?: boolean
	default?: boolean
	modelValue?: Extension
}
const props = withDefaults(defineProps<PropType>(), {
	description: 'x-description',
	checked: false,
	hideButton: false,
	default: false,
	modelValue: null,
})
const emit = defineEmits(['update:modelValue', 'select', 'remove'])
const { $api } = useNuxtApp()
const form = ref<Extension>({
	name: props.name,
	mode: {
		development: false,
		tag: null,
	},
	autoUpgrade: false,
})
const isSelected = ref(props.checked)
const boxClass = computed(() => {
	return isSelected.value ? 'ring-2 ring-gray-400' : 'ring-1 ring-gray-300'
})

// Get extension versions
const versionOptions = ref([])
const branchOptions = ref([
	{ label: 'dev', value: 'dev' },
	{ label: 'staging', value: 'staging' },
])
const tags = computed(() => {
	return form.value.mode.development ? branchOptions.value : versionOptions.value
})

watchEffect(() => {
	// Get extension's versions only user select the extension and the option Development is also checked
	if (!form.value.mode.development && isSelected.value) {
		if (versionOptions.value.length) return
		getExtensionVersions()
	}
})

watch(
	() => form,
	(newVal) => {
		emit('update:modelValue', newVal.value)
	},
	{ deep: true }
)

function toggleSelect() {
	isSelected.value = !isSelected.value
	if (isSelected.value) {
		emit('select', form.value)
	} else {
		emit('remove', form.value)
	}
}

function getExtensionVersions() {
	$api.get(`/api/meta/extensions/${props.name}`).then((res) => {
		versionOptions.value = res.data.data.versions
			.map((e) => {
				return { label: e.version, value: e.version }
			})
			.filter((e) => !e.value.endsWith('-dev'))
	})
}
</script>
<template>
	<div :class="[boxClass, 'relative rounded-lg bg-white p-4 shadow-sm focus:outline-none']">
		<div>
			<div class="flex flex-1 items-start justify-between mb-3">
				<span class="flex flex-col">
					<span class="block text-md font-bold text-gray-900">{{ props.title }}</span>
					<span v-if="description !== ''" class="mt-1 flex items-center text-sm text-gray-500">
						{{ props.description }}
					</span>
				</span>
				<Badge v-if="props.default" variant="secondary">Default</Badge>
				<TwButton v-if="!hideButton" size="sm" :variant="isSelected ? 'success' : 'secondary'" @click="toggleSelect">
					<template v-if="isSelected" #prepend-outer>
						<CheckCircleIcon class="w-4 h-4 mr-2" />
					</template>
					{{ isSelected ? 'Added' : 'Add' }}
				</TwButton>
			</div>
			<div>
				<div class="mb-4">
					<FormKit v-model="form.mode.development" type="checkbox" label="Development" :disabled="!isSelected" />
					<FormKit
						v-model="form.mode.tag"
						type="select"
						label="Version"
						placeholder="Select a version"
						:options="tags"
						:disabled="!isSelected"
					/>
				</div>
				<FormKit v-model="form.autoUpgrade" type="checkbox" label="Auto upgrade" :disabled="!isSelected" />
			</div>
		</div>
	</div>
</template>
