<script lang="ts" setup>
import { Category } from '@/types'
import { TableHeader } from '@/shared/types'

const props = defineProps<{
	type: 'ext' | 'tpl'
}>()

const { $api, $toast } = useNuxtApp()

const isFetching = ref(true)
const isCreating = ref(false)
const isUpdating = ref(false)
const categories = ref<Category[]>([])
const headers: TableHeader[] = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'title',
		text: 'Title',
	},
]
const openUpdateModal = ref(false)
const formUpdate = ref<{
	name: string
	title: string
}>({
	name: '',
	title: '',
})

getCategories().finally(() => (isFetching.value = false))

async function getCategories() {
	const res = await $api.get(`/api/meta/${props.type}-categories`)
	categories.value = res.data.data
}

async function onSubmit(form) {
	isCreating.value = true
	try {
		await $api.post(`/api/meta/${props.type}-categories`, form)
		getCategories()
		$toast.success({ title: 'Category created' })
	} catch (error) {
		$toast.error({ title: 'Cannot create category' })
	}
	isCreating.value = false
}

async function onUpdate() {
	isUpdating.value = true
	try {
		await $api.put(`/api/meta/${props.type}-categories/${formUpdate.value.name}`, {
			title: formUpdate.value.title,
		})
		getCategories()
		openUpdateModal.value = false
		$toast.success({ title: 'Category updated' })
	} catch (error) {
		$toast.error({ title: 'Cannot updated category' })
	}
	isUpdating.value = false
}

function onOpenModal(item: Category) {
	openUpdateModal.value = true
	formUpdate.value = { ...item }
}

function onCloseModal() {
	openUpdateModal.value = false
}
</script>

<template>
	<div class="md:grid md:gap-4 md:grid-cols-[350px_1fr]">
		<div class="mb-6 md:mb-0">
			<TwCard>
				<FormCreateCategory :loading="isCreating" @submit="onSubmit" />
			</TwCard>
		</div>
		<TwCard :body-padding="false">
			<SkeletorTable v-if="isFetching" :headers="headers" />
			<TwTable v-else :items="categories" :headers="headers">
				<template #item-name="{ item }">
					<a href="#" class="text-blue-600 cursor-pointer hover:underline" @click.prevent="onOpenModal(item)">
						{{ item.name }}
					</a>
				</template>
			</TwTable>
		</TwCard>
		<Teleport to="body">
			<Modal v-slot="{ close }" :open="openUpdateModal" @close="onCloseModal">
				<h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">Update category</h3>
				<FormKit v-slot="{ state: { valid } }" type="form" autocomplete="off" :actions="false" @submit="onUpdate">
					<FormKit v-model="formUpdate.title" type="text" name="title" label="Title" validation="required" />
					<div class="mt-4 flex gap-2">
						<TwButton type="submit" variant="primary" :disabled="!valid" :loading="isUpdating">Update</TwButton>
						<TwButton variant="secondary" @click="close">Cancel</TwButton>
					</div>
				</FormKit>
			</Modal>
		</Teleport>
	</div>
</template>
