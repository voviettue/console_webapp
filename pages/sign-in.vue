<template>
	<div class="text-center min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="Workflow" />
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded sm:px-10">
				<h2 class="text-xl mb-6 font-medium text-gray-600">Console Internal</h2>
				<a
					:href="loginUrl"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Sign in with AWS Cognito
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'auth',
	title: 'Sign in',
})

const { url, cognito } = useRuntimeConfig()
const query = new URLSearchParams()
query.append('client_id', cognito.clientId)
query.append('response_type', 'token')
query.append('scope', cognito.scope)
query.append('redirect_uri', `${url}/login-callback`)
const loginUrl = `${cognito.domain}/login?${decodeURIComponent(query.toString())}`
</script>
