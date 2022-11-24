<script lang="ts" setup>
// TODO: submit button
import { Workspace } from '@/types'

const props = defineProps<{
	item: Workspace
}>()
const form = ref(props.item.app.env)
</script>
<template>
	<TwCard>
		<h3 class="mb-5 font-semibold">Environment variables</h3>
		<FormAddEnv v-model="form" />
	</TwCard>
</template>
