<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/databases`" text="Databases" />
		</div>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Add a new database</h1>
				<FormCreateDatabase :org="orgId" :loading="isCreating" @submit="onSubmit" />
			</div>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'New database',
})

const route = useRoute()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const isCreating = ref(false)

async function onSubmit(form) {
	if (isCreating.value) return
	isCreating.value = true
	try {
		await $api.post(`/api/v1alpha1/orgs/${orgId}/mysqlinstances`, form)
		$toast.success({ title: 'Database has been created successfully!' })
		navigateTo(`/orgs/${orgId}/databases`)
	} catch (err) {
		$toast.error({ title: 'Cannot create database', content: JSON.stringify(err.response.data) })
	}
	isCreating.value = false
}
</script>
