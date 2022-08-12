<template>
	<span v-if="value === null || value === undefined"></span>
	<NuxtIcon v-else-if="value === true" name="check-circle" class="text-green-600 h-5 w-5"></NuxtIcon>
	<NuxtIcon v-else name="x-circle" class="text-red-600 h-5 w-5"></NuxtIcon>
</template>

<script setup lang="ts">
interface Props {
	value: any
}
const props = defineProps<Props>()
</script>
