<template>
	<div class="bg-white shadow-md rounded-lg ring-black ring-1 ring-opacity-5">
		<div v-if="title || description" class="p-6 sm:px-6 lg:px-8">
			<div class="sm:flex sm:items-center">
				<div class="sm:flex-auto">
					<slot name="title">
						<h3 v-if="title" class="text-md font-bold">
							{{ title }}
						</h3>
					</slot>

					<slot name="description">
						<p v-if="description" class="mt-2">
							{{ description }}
						</p>
					</slot>
				</div>
			</div>
		</div>
		<div :class="bodyPadding ? 'p-6' : ''">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		title?: string
		description?: string
		bodyPadding?: boolean
	}>(),
	{
		title: undefined,
		description: undefined,
		bodyPadding: true,
	}
)
</script>
