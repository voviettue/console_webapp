<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/overview`" text="Overview" />
		</div>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Add a workspace</h1>
				<FormCreateWorkspace :org="orgId" :loading="isCreating" @submit="onSubmit" />
			</div>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'New workspace',
	middleware: ['auth'],
})

const route = useRoute()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const isCreating = ref(false)

async function onSubmit(form: any) {
	if (isCreating.value) return
	isCreating.value = true
	try {
		await $api.post(`/api/v1alpha1/orgs/${orgId}/workspaces`, form)
		$toast.success({ title: 'Workspace has been created successfully!' })
		navigateTo(`/orgs/${orgId}/overview`)
	} catch (err) {
		$toast.error({ title: 'Cannot create workspace', content: JSON.stringify(err.response.data) })
	}
	isCreating.value = false
}
</script>
