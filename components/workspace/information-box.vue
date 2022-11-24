<script lang="ts" setup>
import { Workspace } from '@/types'

const props = defineProps<{
	item: Workspace
}>()

const { $api, $toast } = useNuxtApp()

const deletionProtection = ref(props.item.deletionProtection)
const deletionProtectionLabel = computed(() => {
	return deletionProtection.value ? 'Enabled' : 'Disabled'
})

const headers = [
	{ value: 'name', text: 'Name' },
	{ value: 'owner', text: 'Owner' },
	{ value: 'status', text: 'Status', display: 'status' },
	{ value: 'createdAt', text: 'Created at' },
	{ value: 'deletionProtection', text: 'Deletion protection' },
]

async function onChangeDeletionProtection(value) {
	try {
		await $api.patch(`/api/v1alpha1/orgs/${props.item.org}/workspaces/${props.item.name}`, {
			deletionProtection: value,
		})
		$toast.success({ title: value ? 'Deletion protection enabled' : 'Deletion protection disabled' })
	} catch (err) {
		$toast.error({ title: 'Cannot change deletion protection value' })
	}
}
</script>

<template>
	<TwCard>
		<h3 class="mb-5 font-semibold">Workspace information</h3>
		<TwList :headers="headers" :item="props.item">
			<template #item-deletionProtection>
				<FormToggleSwitch
					v-model="deletionProtection"
					:label="deletionProtectionLabel"
					@input="onChangeDeletionProtection"
				/>
			</template>
		</TwList>
	</TwCard>
</template>
