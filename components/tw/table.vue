<template>
	<div class="overflow-x-auto">
		<div class="inline-block min-w-full align-middle">
			<table class="min-w-full divide-y divide-gray-300">
				<thead v-if="!hideHeader">
					<tr class="border-t border-gray-200">
						<th
							v-for="header in normalizedHeaders"
							:key="`th-${header?.value}`"
							class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							scope="col"
						>
							<slot :name="`header-${header.value}`" :header="header">
								{{ get(header, 'text') ?? '—' }}
							</slot>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					<tr
						v-for="(item, index) in items"
						:key="`tr-${index}`"
						:class="{ 'hover:bg-gray-100 cursor-pointer': clickable }"
						@click.stop="onRowClick(item)"
					>
						<td
							v-for="header in normalizedHeaders"
							:key="`td-${header}`"
							class="px-6 py-3 w-full whitespace-nowrap text-sm font-medium text-gray-900"
						>
							<slot
								:name="`item-${header?.value}`"
								:item="item"
								:value="get(item, header.value)"
							>
								<RenderDisplay
									v-if="header?.display"
									:name="header.display"
									:value="get(item, header.value)"
									:options="header?.displayOptions"
								></RenderDisplay>
								<template v-else>
									{{ get(item, header.value) ?? '—' }}
								</template>
							</slot>
						</td>
					</tr>
					<tr v-if="items.length === 0">
						<td
							:colspan="headers.length"
							class="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6 md:pl-0 text-center text-gray-400"
						>
							No data
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TableHeader } from '~/shared/types'

const props = defineProps<{
	headers: (string | Partial<TableHeader>)[]
	items?: Record<string, any>[]
	rowClick: (item: any) => void
	hideHeader: boolean
}>()

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers.map((header: any) =>
		header instanceof Object ? header : { value: header, text: header }
	)
})

const clickable = !!props.rowClick
const { get } = useLodash()
function onRowClick(item) {
	if (props.rowClick) props.rowClick(item)
}
</script>
