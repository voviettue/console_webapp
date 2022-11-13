<script lang="ts" setup>
withDefaults(
	defineProps<{
		tabs: number
	}>(),
	{
		tabs: 5,
	}
)
</script>

<template>
	<div class="lg:grid gap-8 grid-cols-[200px_1fr]">
		<div class="flex gap-2 flex-col">
			<Skeletor v-for="i in tabs" :key="i" width="100" />
		</div>
		<div>
			<TwCard>
				<div class="flex gap-4 flex-col">
					<Skeletor width="120" />
					<Skeletor width="100%" height="150" class="rounded-lg" />
				</div>
			</TwCard>
		</div>
	</div>
</template>
