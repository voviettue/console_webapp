<template>
	<TwCard class="pt-4">
		<div class="flex justify-start">
			<div>
				<slot name="description"></slot>
			</div>
		</div>
	</TwCard>
</template>
<script setup lang="ts">
type PropType = {
	icon: string
}
withDefaults(defineProps<PropType>(), {
	icon: '',
})
</script>
