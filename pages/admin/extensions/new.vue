<script setup lang="ts">
definePageMeta({
	title: 'New extension',
})

const { $api, $toast } = useNuxtApp()
const isCreating = ref(false)

async function onSubmit(form) {
	if (isCreating.value) return
	isCreating.value = true
	try {
		await $api.post(`/api/meta/extensions`, form)
		$toast.success({ title: 'Extension has been created successfully!' })
		navigateTo(`/admin/extensions`)
	} catch (err) {
		$toast.error({ title: 'Cannot create extension', content: JSON.stringify(err.response.data) })
	}
	isCreating.value = false
}
</script>

<template>
	<PageWrapper>
		<div class="mb-8">
			<ButtonBack :to="`/admin/extensions`" text="Extensions" />
		</div>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Add new extension</h1>
				<FormCreateExtension :loading="isCreating" @submit="onSubmit" />
			</div>
		</TwCard>
	</PageWrapper>
</template>
