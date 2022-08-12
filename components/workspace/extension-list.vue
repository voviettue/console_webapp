<template>
	<div>
		<TwCard>
			<TwTable
				:headers="headers"
				:items="items"
			>
				<template #item-actions>
					<button
						class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
						type="button"
						@click="open = true"
					>
						<NuxtIcon name="pencil" class="h-5 w-5"/>
					</button>
				</template>
			</TwTable>
		</TwCard>
		<TransitionRoot as="template" :show="open">
			<Dialog as="div" class="relative z-10" @close="open = false">
				<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
					<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div class="fixed z-10 inset-0 overflow-y-auto">
					<div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
						<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<DialogPanel class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
								<div>
									<div>
										<DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 mb-6">Edit Workspace </DialogTitle>
										<FormKit
											v-model="values"
											type="form"
											method="POST"
											submit-label="Sign in"
											:incomplete-message="false"
											:actions="false"
											@submit="submit()"
										>
											<div class="space-y-6">
												<FormKit
													type="text"
													name="name"
													label="Name"
													validation="required"
												/>

												<FormKit
													type="text"
													name="package_name"
													label="Package Name"
													validation="required"
												/>

												<FormKit
													type="checkbox"
													name="is_dev"
													label="Is dev"
												/>

												<FormKit
													type="checkbox"
													name="auto_upgrade"
													label="Auto Upgrade"
												/>

												<div v-if="error" class="alert-error">{{ error }}</div>
											</div>
										</FormKit>
									</div>
								</div>
								<div class="grid grid-cols-2 space-x-6 mt-5 sm:mt-6">
									<button type="button" class="rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" @click="open = false">Cancel</button>
									<button type="button" class="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" @click="open = false">Save</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false)
const headers = [
	'name',
	'package_name',
	'version',
	{value: 'is_dev', text: 'Is Dev', display: 'boolean'},
	{value: 'is_auto_upgrade', text: 'Auto Upgrade', display: 'boolean'},
	{ value: 'actions', text: '' },
]

const items = [
	{
		name: 'Base',
		package_name: '@gigagress-extensions/base',
		version: '1.1.0',
		is_dev: true,
		is_auto_upgrade: true,
	},
	{
		name: 'Pro',
		package_name: '@gigagress-extensions/pro',
		version: '2.1.0',
		is_dev: false,
		is_auto_upgrade: false,
	},
]

const values = items[0];
</script>