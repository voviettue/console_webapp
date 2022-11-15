<template>
	<Menu as="div" class="relative inline-block text-left">
		<MenuButton
			class="whitespace-nowrap inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
		>
			Auto refresh
			<span class="ml-1 px-1.5 bg-blue-100 text-blue-700 text-white h-4 block rounded-full text-xs">
				{{ badge }}
			</span>
			<ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
		</MenuButton>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<MenuItems
				class="absolute right-0 z-10 mt-2 -mr-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="py-1">
					<MenuItem v-for="item in items" :key="item.value" v-slot="{ active }" @click="interval = item.value">
						<span
							:class="[
								active || item.value === interval ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm',
							]"
						>
							{{ item.text }}
						</span>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = withDefaults(
	defineProps<{
		modelValue: number
	}>(),
	{
		modelValue: null,
	}
)

const emit = defineEmits(['update:modelValue', 'refresh'])

const interval = computed<number | null>({
	get() {
		return props.modelValue
	},
	set(newVal) {
		emit('update:modelValue', newVal)
	},
})

const activeInterval = ref<NodeJS.Timeout | null>(null)

watch(
	interval,
	(newInterval) => {
		if (activeInterval.value !== null) {
			clearInterval(activeInterval.value)
		}
		if (newInterval !== null && newInterval > 0) {
			activeInterval.value = setInterval(() => {
				emit('refresh')
			}, newInterval * 1000)
		}
	},
	{ immediate: true }
)

const items = computed(() => {
	const intervals = [5, 15, 60, 180]
	return intervals.map((seconds) => {
		return seconds >= 60 && seconds % 60 === 0
			? {
					text: `Every ${seconds / 60} ${seconds / 60 > 1 ? 'minutes' : 'minute'}`,
					value: seconds,
			  }
			: {
					text: `Every ${seconds} ${seconds > 1 ? 'seconds' : 'second'}`,
					value: seconds,
			  }
	})
})

const badge = computed(() => {
	return interval.value >= 60 && interval.value % 60 === 0 ? `${interval.value / 60}m` : `${interval.value}s`
})
</script>
