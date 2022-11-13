<script lang="ts" setup>
const { $api } = useNuxtApp()
const isFetching = ref(true)
const snapshots = ref([])
getSnapshots().finally(() => (isFetching.value = false))
async function getSnapshots() {
	const res = await $api.get(`/api/meta/snapshots/default`)
	snapshots.value = res.data.data
}
const headers = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'size',
		text: 'Size',
		display: 'file-size',
	},
	{
		value: 'modifedAt',
		text: 'Date Updated',
		display: 'date',
	},
]
</script>
<template>
	<div>
		<h1 class="font-medium text-2xl mb-8">Snapshots</h1>
		<TwCard :body-padding="false">
			<SkeletorTable v-if="isFetching" :headers="headers" />
			<TwTable v-else :items="snapshots" :headers="headers"></TwTable>
		</TwCard>
	</div>
</template>
