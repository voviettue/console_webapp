<script lang="ts" setup>
const { $api, $toast } = useNuxtApp()
const route = useRoute()
const attrs = useAttrs()
const { refreshInterval } = useCollectionPreset('ws_details_snapshots')
const org = route.params.orgid as string
const ws = route.params.id as string
const isFetching = ref(true)
const isCreatingSnapshot = ref(false)
const snapshotEnabled = ref(attrs.workspace.snapshotEnabled)
const snapshots = ref([])

getSnapshots().finally(() => (isFetching.value = false))
async function getSnapshots() {
	const res = await $api.get(`/api/v1alpha1/orgs/${org}/workspaces/${ws}/snapshots`)
	snapshots.value = res.data.data ?? []
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
	{
		value: 'actions',
		text: '',
	},
]

const checkboxLabel = computed(() => {
	return snapshotEnabled.value ? 'Automattic snapshots are enabled' : 'Automattic snapshots are disabled'
})

async function enableSnapshot(value) {
	try {
		await $api.patch(`/api/v1alpha1/orgs/${org}/workspaces/${ws}`, {
			snapshotEnabled: value,
		})
		$toast.success({ title: value ? 'Snapshot enabled' : 'Snapshot disabled' })
	} catch (err) {}
}

async function createSnapshot() {
	isCreatingSnapshot.value = true
	try {
		await $api.patch(`/api/v1alpha1/orgs/${org}/workspaces/${ws}`, {
			snapshotRunAt: 's-' + Date.now().toString(),
		})
		getSnapshots()
	} catch (err) {}
	isCreatingSnapshot.value = false
}

function refresh() {
	getSnapshots()
}
</script>
<template>
	<div>
		<h1 class="font-medium text-2xl mb-8">Snapshots</h1>
		<div class="md:flex md:items-center justify-between mb-6">
			<div class="mb-4 md:mb-0">
				<FormKit v-model="snapshotEnabled" type="checkbox" :label="checkboxLabel" @input="enableSnapshot" />
			</div>
			<div class="flex items-center gap-2">
				<TwButton
					v-if="snapshotEnabled"
					class="flex-1"
					variant="secondary"
					:loading="isCreatingSnapshot"
					@click.prevent="createSnapshot"
				>
					Create snapshot
				</TwButton>
				<DropdownAutoRefresh v-model="refreshInterval" class="flex-1" @refresh="refresh" />
			</div>
		</div>
		<TwCard :body-padding="false">
			<SkeletorTable v-if="isFetching" :headers="headers" />
			<TwTable v-else :items="snapshots" :headers="headers"></TwTable>
		</TwCard>
	</div>
</template>
