<template>
	<main class="flex-1">
		<div class="py-6 space-y-6">
			<div v-if="hasSlotTitle" class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<div class="flex justify-between items-center">
					<h1 class="text-2xl font-semibold text-gray-900">
						<slot name="title"></slot>
					</h1>
					<slot name="actions"></slot>
				</div>
			</div>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<slot></slot>
			</div>
		</div>
	</main>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
const hasSlotTitle = computed(() => slots?.title !== undefined)
</script>
