<template>
	<div>
		<PageTopbar />
		<main class="flex-1">
			<div class="py-6">
				<div v-if="hasSlotTitle" class="max-w-7xl mx-auto px-4 mb-8 sm:px-6 md:px-8">
					<div class="flex justify-between items-center">
						<div class="flex items-center">
							<slot name="title:prepend"></slot>
							<h1 class="text-xl font-normal text-gray-900">
								<slot name="title"></slot>
							</h1>
						</div>
						<slot name="actions"></slot>
					</div>
				</div>
				<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
					<slot></slot>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
const hasSlotTitle = computed(() => slots?.title !== undefined)
</script>
