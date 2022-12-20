<script lang="ts" setup>
import { Workspace } from '@/types'
import { TableHeader } from '@/shared/types'
import { useWorkspacesStore } from '@/stores/workspaces'

const { $api, $toast } = useNuxtApp()

const props = defineProps<{
	item: Workspace
}>()
const store = useWorkspacesStore()
const ws = ref(props.item)
const ledger = ref(props.item.ledger)
const headers: TableHeader[] = [
	{ value: 'region', text: 'Region' },
	{ value: 'version', text: 'Version' },
	{ value: 'extVersion', text: 'Extension version' },
	{ value: 'deletionProtection', text: 'Deletion protection' },
]
const isCreating = ref(false)
const isDeleting = ref(false)
const openDeletionModal = ref(false)
const deletedLedgerName = ref('')
const deletionProtection = ref(true)
const deletionProtectionLabel = computed(() => {
	return deletionProtection.value ? 'Enabled' : 'Disabled'
})
const ledgerName = computed(() => {
	return `${ws.value.org}-${ws.value.name}`
})
const isEnabled = computed(() => {
	return ws.value.ledger.status !== null && ws.value.ledger.status !== 'DELETED'
})

const statusBadgeVariant = computed(() => {
	const status = ws.value.ledger.status
	switch (true) {
		case status === 'CREATING':
			return 'warning'
		case status === 'DELETING':
			return 'danger'
		default:
			return 'success'
	}
})

if (isEnabled.value) {
	getLedger()
}

setInterval(async () => {
	if (ws.value.ledger.status === 'CREATING' || ws.value.ledger.status === 'DELETING') {
		ws.value = await store.getWorkspace(ws.value.org, ws.value.name)
	}
}, 5000)

async function getLedger() {
	const res = await $api.get(`/api/v1alpha1/orgs/${props.item.org}/workspaces/${props.item.name}/ledgers`)
	ledger.value = { ...ledger.value, ...res.data.data }
	deletionProtection.value = ledger.value.deletionProtection
}

async function onEnable() {
	isCreating.value = true
	await $api.post(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}/ledgers`)
	ws.value = await store.getWorkspace(ws.value.org, ws.value.name)
	isCreating.value = false
}

async function onChangeDeletionProtection(value) {
	try {
		await $api.put(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}/ledgers`, {
			deletionProtection: value,
		})
		$toast.success({ title: value ? 'Deletion protection enabled' : 'Deletion protection disabled' })
	} catch (err) {
		$toast.error({ title: 'Cannot change deletion protection value' })
	}
}

async function onDelete() {
	isDeleting.value = true
	try {
		await $api.delete(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}/ledgers`)
		ws.value = await store.getWorkspace(ws.value.org, ws.value.name)
		onCloseModal()
	} catch (err) {
		$toast.error({ title: 'Cannot delete ledger' })
	}
	isDeleting.value = false
}

function onCloseModal() {
	openDeletionModal.value = false
	deletedLedgerName.value = ''
}
</script>
<template>
	<div class="space-y-6">
		<TwCard>
			<div class="mb-5 flex gap-4 items-center">
				<h3 class="font-semibold">Ledger service</h3>
				<Badge v-if="isEnabled" :variant="statusBadgeVariant">{{ ws.ledger.status }}</Badge>
			</div>
			<div>
				<template v-if="ws.ledger.status === 'CREATING'">
					<div class="flex gap-2 items-center mb-2">
						<TwLoading class="w-4 h-4" />
						<p class="font-semibold">
							Creating ledger
							<code>{{ ledgerName }}</code>
						</p>
					</div>
					<p>Your ledger may take a few minutes to become active.</p>
				</template>
				<template v-else-if="ws.ledger.status === 'DELETING'">
					<div class="flex gap-2 items-center mb-2">
						<TwLoading class="w-4 h-4" />
						<p class="font-semibold">
							Deleting ledger
							<code>{{ ledgerName }}</code>
						</p>
					</div>
					<p>Your ledger may take a few minutes to delete.</p>
				</template>
				<template v-else-if="ws.ledger.status === 'ACTIVE'">
					<TwList :headers="headers" :item="ws.ledger">
						<template #item-deletionProtection>
							<FormToggleSwitch
								v-model="deletionProtection"
								:label="deletionProtectionLabel"
								@input="onChangeDeletionProtection"
							/>
						</template>
					</TwList>
				</template>
				<template v-else>
					<TwButton :disabled="isCreating" :loading="isCreating" @click="onEnable">Enable ledger service</TwButton>
				</template>
			</div>
		</TwCard>
		<TwCard v-if="ws.ledger.status === 'ACTIVE'" class="border border-red-300">
			<h3 class="mb-5 font-semibold">Delete ledger</h3>
			<p class="mb-5">This ledger will be permanently deleted. This action cannot be undone.</p>
			<TwButton variant="danger" @click="openDeletionModal = true">Delete ledger</TwButton>
			<Teleport to="body">
				<Modal :open="openDeletionModal" @close="onCloseModal">
					<template #title>Delete ledger</template>
					<div class="space-y-2">
						<p>
							<span>To confirm deletion, enter</span>
							<span class="italic">{{ `delete ${ledgerName}` }}</span>
							<span>in the field below.</span>
						</p>
						<FormKit v-model="deletedLedgerName" :placeholder="`delete ${ledgerName}`" />
					</div>
					<template #actions="{ close }">
						<TwButton variant="secondary" @click="close">Cancel</TwButton>
						<TwButton
							variant="danger"
							:disabled="deletedLedgerName !== `delete ${ledgerName}`"
							:loading="isDeleting"
							@click="onDelete"
						>
							Delete
						</TwButton>
					</template>
				</Modal>
			</Teleport>
		</TwCard>
	</div>
</template>
