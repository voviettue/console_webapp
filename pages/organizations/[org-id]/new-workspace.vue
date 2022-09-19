<template>
	<PageWrapper>
		<template #title>Workspaces</template>

		<TwCard class="rounded-lg">
			<div class="mx-auto max-w-md">
				<FormKit
					v-model="form"
					type="form"
					submit-label="Create"
					autocomplete="off"
					method="POST"
					@submit="submitHandler"
				>
					<FormKit label="Name" name="name" type="text" placeholder="My workspace" validation="required|length:3,10" />
					<FormKit
						label="Subdomain"
						name="subdomain"
						type="text"
						placeholder="my-workspace"
						:help="subdomainHelpText"
						validation="required|length:3,10|matches:/^[0-9a-z](-?[0-9a-z])*$/"
					/>
				</FormKit>
			</div>
		</TwCard>
	</PageWrapper>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import slugify from 'slugify'

const form = ref({
	name: '',
	subdomain: '',
})

watch(
	() => form.value.name,
	() => {
		form.value.subdomain = slugify(form.value.name, { lower: true })
	}
)

const subdomainHelpText = computed(() => {
	if (form.value.subdomain === '') return ''
	return `${form.value.subdomain}.catex.se`
})

const submitHandler = () => {
	return true
}
</script>
