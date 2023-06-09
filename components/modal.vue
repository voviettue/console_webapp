<template>
	<TransitionRoot as="template" :show="open">
		<Dialog as="div" class="relative z-40" @close="close">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</TransitionChild>

			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enter-to="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 sm:scale-100"
						leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<DialogPanel
							class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
						>
							<div class="mt-3 text-center sm:mt-0 sm:text-left">
								<DialogTitle v-if="hasSlotTitle" as="h3" class="mb-4 text-lg font-medium leading-6 text-gray-900">
									<slot name="title"></slot>
								</DialogTitle>
								<div class="mt-2">
									<slot v-bind="{ open, close }">Fallback content</slot>
								</div>
							</div>
							<div v-if="hasSlotActions" class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
								<slot name="actions" v-bind="{ open, close }"></slot>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const slots = useSlots()

type PropType = {
	open: boolean
}

const props = withDefaults(defineProps<PropType>(), {
	open: false,
})

const emit = defineEmits(['close'])

const open = ref(props.open)

watch(
	() => props.open,
	(newVal) => (open.value = newVal)
)

const hasSlotTitle = computed(() => slots?.title !== undefined)
const hasSlotActions = computed(() => slots?.actions !== undefined)

function close() {
	open.value = false
	emit('close')
}
</script>
