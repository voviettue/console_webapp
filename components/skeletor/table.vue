<template>
	<div class="overflow-x-auto">
		<div class="inline-block min-w-full align-middle">
			<table class="min-w-full divide-y divide-gray-300">
				<thead v-if="!hideHeader">
					<tr>
						<th
							v-for="(header, index) in normalizedHeaders"
							:key="`th-${index}`"
							class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
							scope="col"
						>
							{{ header.text }}
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					<tr v-for="rowIndex in rows" :key="`tr-${rowIndex}`">
						<td
							v-for="(header, colIndex) in normalizedHeaders"
							:key="`td-${colIndex}`"
							class="px-6 py-2 w-full whitespace-nowrap text-sm font-medium text-gray-900"
						>
							<Skeletor />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TableHeader } from '~/shared/types'

const props = withDefaults(
	defineProps<{
		headers: (string | Partial<TableHeader>)[]
		rows?: number
		hideHeader?: boolean
	}>(),
	{
		rows: 5,
		hideHeader: false,
	}
)

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers.map((header: any) => (header instanceof Object ? header : { value: header, text: header }))
})
</script>
