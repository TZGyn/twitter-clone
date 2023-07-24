<script setup lang="ts">
type Navigation = {
	path: string
	icon: string
}

const options: Navigation[] = [
	{
		path: '/',
		icon: 'home',
	},
	{
		path: '/',
		icon: 'search',
	},
	{
		path: '/',
		icon: 'bell',
	},
	{
		path: '/',
		icon: 'mail',
	},
]
</script>

<template>
	<div>
		<div
			class="fixed bottom-0 flex w-full justify-between gap-6 border border-lightgray bg-primary px-8 py-2">
			<div
				v-for="option in options"
				@click="navigateTo(option.path)">
				<Icon
					:name="option.icon"
					size="32" />
			</div>
		</div>
	</div>
</template>
