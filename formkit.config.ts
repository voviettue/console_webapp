import { generateClasses } from '@formkit/themes'

const textClassification = {
	outer: 'mb-5',
	label: 'block text-sm font-medium text-gray-700 mb-1',
	inner: 'max-w-md rounded mb-1 overflow-hidden focus-within:border-blue-500',
	input:
		'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
	help: 'text-xs text-gray-500',
	messages: 'list-none p-0 mt-1 mb-0',
	message: 'text-red-500 mb-1',
}
const boxClassification = {
	fieldset: 'max-w-md border border-gray-400 rounded-md px-2 pb-1',
	legend: 'font-bold text-sm',
	wrapper: 'flex items-center mb-1 cursor-pointer',
	help: 'mb-2',
	input:
		'form-check-input appearance-none h-5 w-5 mr-2 border border-gray-500 rounded bg-white checked:bg-blue-500 focus:outline-none focus:ring-0 transition duration-200',
	label: 'text-sm text-gray-700 mt-1',
}
const buttonClassification = {
	wrapper: 'mb-1',
	input:
		'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
}

const theme = {
	// the global key will apply to all inputs
	global: {
		outer: 'mb-5 formkit-disabled:opacity-50',
		help: 'text-xs text-gray-500',
		messages: 'list-none p-0 mt-1 mb-0',
		message: 'text-red-500 mb-1 text-xs',
	},
	button: buttonClassification,
	color: {
		label: 'block mb-1 font-bold text-sm',
		input: 'w-16 h-8 appearance-none cursor-pointer border border-gray-300 rounded-md mb-2 p-1',
	},
	date: textClassification,
	'datetime-local': textClassification,
	form: { ...textClassification, messages: 'hidden' },
	checkbox: boxClassification,
	email: textClassification,
	file: {
		label: 'block mb-1 font-bold text-sm',
		inner: 'max-w-md cursor-pointer',
		input:
			'text-gray-600 text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600',
		noFiles: 'block text-gray-800 text-sm mb-1',
		fileItem: 'block flex text-gray-800 text-sm mb-1',
		fileRemove: 'ml-auto text-blue-500 text-sm',
	},
	month: textClassification,
	number: textClassification,
	password: textClassification,
	radio: {
		...boxClassification,
		input: boxClassification.input.replace('rounded', 'rounded-full'),
	},
	range: {
		inner: 'max-w-md',
		input:
			'form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none',
	},
	search: textClassification,
	select: textClassification,
	submit: buttonClassification,
	tel: textClassification,
	text: textClassification,
	textarea: {
		...textClassification,
		input: 'block w-full h-32 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus:shadow-outline',
	},
	time: textClassification,
	url: textClassification,
	week: textClassification,
}

export default {
	config: {
		classes: generateClasses(theme),
	},
}
