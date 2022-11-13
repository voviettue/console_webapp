<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/databases`" text="Databases" />
		</div>
		<div v-if="isFetchingMySqlInstance">
			<TwCard class="mb-8">
				<div>
					<Skeletor width="100" />
				</div>
				<div>
					<Skeletor width="160" class="mr-2" />
				</div>
				<div>
					<Skeletor width="160" class="mr-2" />
				</div>
			</TwCard>
		</div>
		<template v-else>
			<TwCard class="mb-8">
				<h1 class="text-xl font-medium mb-4">{{ mySqlInstance.name }}</h1>
				<div class="mb-4">
					<dl>
						<dt class="uppercase text-xs text-gray-500">Storage amount</dt>
						<dd>{{ `${mySqlInstance.storageGB} GB` }}</dd>
					</dl>
				</div>
				<div class="mb-4">
					<dl>
						<dt class="uppercase text-xs text-gray-500">Instance</dt>
						<dd>{{ mySqlInstance.instanceClass }}</dd>
					</dl>
				</div>
				<div class="md:flex gap-8">
					<dl class="mb-4 md:mb-0">
						<dt class="uppercase text-xs text-gray-500">Status</dt>
						<dd>
							<DisplayStatus :value="mySqlInstance.status"></DisplayStatus>
						</dd>
					</dl>
					<dl>
						<dt class="uppercase text-xs text-gray-500">Created</dt>
						<dd>
							<DisplayDate :value="mySqlInstance.createdAt" />
						</dd>
					</dl>
				</div>
			</TwCard>
			<TwCard class="border border-red-300">
				<h3 class="mb-5 font-semibold">Delete database</h3>
				<p class="mb-5">This database will be permanently deleted. This action cannot be undone.</p>
				<TwButton variant="danger" @click="openDeletionModal = true">Delete this database</TwButton>
			</TwCard>
			<Teleport to="body">
				<Modal :open="openDeletionModal" @close="onCloseModal">
					<template #title>Delete database</template>
					<div class="space-y-2">
						<p>
							Are you absolutely sure you want to delete
							<strong class="font-bold">{{ mySqlInstance.name }}</strong>
							?
						</p>
						<p><strong>This action cannot be undone</strong></p>
						<FormKit v-model="deletedMySqlInstanceName" placeholder="Type in the name of the workspace to confirm" />
						<code>{{ mySqlInstance.name }}</code>
					</div>
					<template #actions="{ close }">
						<TwButton variant="secondary" @click="close">Cancel</TwButton>
						<TwButton
							variant="danger"
							:disabled="deletedMySqlInstanceName !== mySqlInstance.name"
							:loading="isDeletingMySqlInstance"
							@click="deleteMySqlInstance"
						>
							Delete
						</TwButton>
					</template>
				</Modal>
			</Teleport>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMysqlInstancesStore } from '@/stores/mysql-instances'
import { MySQLInstance } from '@/types'

const store = useMysqlInstancesStore()
const route = useRoute()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const id = route.params.id as string
const mySqlInstance = ref<MySQLInstance>()
const isFetchingMySqlInstance = ref(true)
const deletedMySqlInstanceName = ref('')
const openDeletionModal = ref(false)
const isDeletingMySqlInstance = ref(false)

store
	.getMySqlInstance(orgId, `${orgId}-${id}`)
	.then((res) => {
		mySqlInstance.value = res
	})
	.catch((err) => {
		throw new Error(String(err))
	})
	.finally(() => (isFetchingMySqlInstance.value = false))

definePageMeta({
	title: 'Workspace details',
	middleware: ['auth'],
})

function onCloseModal() {
	openDeletionModal.value = false
	deletedMySqlInstanceName.value = ''
}

async function deleteMySqlInstance() {
	if (isDeletingMySqlInstance.value) return
	isDeletingMySqlInstance.value = true
	try {
		await $api.delete(`/api/v1alpha1/orgs/${orgId}/mysqlinstances/${orgId}-${id}`)
		navigateTo(`/orgs/${orgId}/databases`)
	} catch (err) {
		$toast.error({ title: 'Cannot delete this MySQL instance', content: JSON.stringify(err.response.data) })
	}
	isDeletingMySqlInstance.value = false
}
</script>
