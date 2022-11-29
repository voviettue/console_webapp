<script setup lang="ts">
definePageMeta({
	title: 'New template',
	middleware: ['auth'],
})

const { $api, $toast } = useNuxtApp()
const isCreating = ref(false)

async function onSubmit(form) {
	if (isCreating.value) return
	isCreating.value = true
	try {
		await $api.post(`/api/meta/templates`, form)

		// Patch workspace publish tpl
		await $api.patch(`/api/v1alpha1/orgs/${form.org}/workspaces/${form.workspace}`, {
			publishTpl: {
				enabled: true,
				name: form.name,
				runAt: `runat-${Date.now().toString()}`,
			},
		})

		$toast.success({ title: 'Template has been created successfully!' })
		navigateTo(`/admin/templates`)
	} catch (err) {
		// Cleanup
		$api.delete(`/api/meta/templates/${form.name}`)
		$toast.error({ title: 'Cannot create template', content: JSON.stringify(err.response.data) })
	}
	isCreating.value = false
}
</script>

<template>
	<PageWrapper>
		<div class="mb-8">
			<ButtonBack :to="`/admin/templates`" text="Templates" />
		</div>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Add new template</h1>
				<FormCreateTemplate :loading="isCreating" @submit="onSubmit" />
			</div>
		</TwCard>
	</PageWrapper>
</template>
