<template>
	<PageWrapper>
		<template #title:prepend>
			<button
				class="mr-2 p-2 inline-flex items-center rounded-full border border-transparent bg-indigo-100 p-1 text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="router.back()"
			>
				<ArrowLeftIcon class="w-4 h-4" />
			</button>
		</template>
		<template #title>New workspace</template>
		<FormKit
			v-slot="{ state: { valid } }"
			type="form"
			autocomplete="off"
			method="POST"
			:actions="false"
			@submit="submitHandler"
		>
			<div id="workspace-information" class="md:grid md:grid-cols-3 md:gap-6 mb-5">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Workspace information</h3>
						<p class="mt-1 text-sm text-gray-600"></p>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
							<FormKit
								v-model="form.name"
								label="Workspace Name"
								name="name"
								type="text"
								placeholder="Example"
								validation="required|length:3,20"
							/>
							<FormKit
								v-model="form.subdomain"
								label="Workspace URL"
								name="subdomain"
								type="text"
								placeholder="example"
								:help="subdomainHelpText"
								validation="required|length:3,20|matches:/^[0-9a-z](-?[0-9a-z])*$/"
							/>
							<FormSelectMysqlInstances
								v-model="form.mysqlinstance"
								label="Database"
								name="mysqlinstance"
								placeholder="Select a MySQL instance"
								validation="required"
								:org-id="orgId"
							/>
						</div>
					</div>
				</div>
			</div>
			<!-- Workspace Information -->
			<div id="app-information" class="md:grid md:grid-cols-3 md:gap-6 mb-5">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">App information</h3>
						<p class="mt-1 text-sm text-gray-600">Admin credentials, environment variables.</p>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
							<FormKit
								v-model="form.app.adminEmail"
								label="Admin email"
								name="adminEmail"
								type="email"
								placeholder="admin@example.com"
								validation="required|email"
							/>
							<FormKit
								v-model="form.app.adminPassword"
								label="Admin password"
								name="adminPassword"
								type="password"
								placeholder=""
								validation="required"
							/>
							<div>
								<span class="block text-sm font-medium text-gray-700 mb-1">Environment variables</span>
								<FormAddEnv v-model="form.app.env" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- App -->
			<div id="extensions" class="md:grid md:grid-cols-3 md:gap-6 mb-5">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Extensions</h3>
						<p class="mt-1 text-sm text-gray-600"></p>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
							<div class="grid grid-cols-2 gap-4">
								<template v-if="isFetchingExtensions">
									<div v-for="i in 4" :key="i">
										<SkeletorExtensionSelect />
									</div>
								</template>
								<template v-else>
									<FormSelectExtension
										v-for="ext in store.defaultExtensions"
										:key="ext.name"
										:name="ext.name"
										:title="ext.title"
										checked
										hide-button
										default
										@update:model-value="onChangeExtension"
									/>
									<FormSelectExtension
										v-for="ext in store.extensions"
										:key="ext.name"
										:name="ext.name"
										:title="ext.title"
										@update:model-value="onChangeExtension"
										@select="onSelectExtension"
										@remove="onRemoveExtension"
									/>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Extensions -->
			<div id="front-office" class="md:grid md:grid-cols-3 md:gap-6">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Front-office</h3>
						<p class="mt-1 text-sm text-gray-600"></p>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
							<FormKit v-model="form.webapp.enabled" label="Enable front-office" name="webappEnable" type="checkbox" />
							<FormKit v-model="form.webapp.version" label="Version" name="webappVersion" type="text" placeholder="" />
						</div>
					</div>
				</div>
			</div>
			<!-- Front office -->
			<div class="flex justify-end my-6">
				<FormKit type="submit" :disabled="!valid" />
			</div>
		</FormKit>
	</PageWrapper>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import slugify from 'slugify'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { Extension } from '@/types'
import { useExtensionsStore } from '@/stores/extensions'

interface WorkspacePayload {
	name: string
	subdomain: string
	mysqlinstance: string
	app: Record<string, any>
	webapp: Record<string, any>
	extensions: Extension[]
}

definePageMeta({
	title: 'New workspace',
	middleware: ['auth'],
})

const router = useRouter()
const route = useRoute()
const orgId = route.params.orgid as string
const store = useExtensionsStore()
const isFetchingExtensions = ref(true)
store.getExtensions().finally(() => {
	isFetchingExtensions.value = false
})

const form = ref<WorkspacePayload>({
	name: '',
	subdomain: '',
	mysqlinstance: '',
	app: {
		adminEmail: '',
		adminPassword: '',
		env: [{ name: '', value: '' }],
	},
	webapp: {
		enabled: false,
		version: '1.0.0',
	},
	extensions: [
		{
			name: 'base',
			mode: {
				development: false,
				version: null,
			},
			autoUpgrade: false,
		},
		{
			name: 'pro',
			mode: {
				development: false,
				version: null,
			},
			autoUpgrade: false,
		},
	],
})

watch(
	() => form.value.subdomain,
	(newVal) => {
		form.value.subdomain = slugify(newVal, { lower: true })
	}
)

const subdomainHelpText = computed(() => {
	if (form.value.subdomain === '') return 'https://example.catex.se'
	return `https://${form.value.subdomain}.catex.se`
})

function onChangeExtension(ext: Extension) {
	form.value.extensions = form.value.extensions.map((e) => {
		return e.name === ext.name ? ext : e
	})
}

function onSelectExtension(ext: Extension) {
	form.value.extensions.push(ext)
}

function onRemoveExtension(ext: Extension) {
	form.value.extensions = form.value.extensions.filter(({ name }) => name !== ext.name)
}

function submitHandler() {
	return true
}
</script>
