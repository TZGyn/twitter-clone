<script setup lang="ts">
const userIcon = ref()

const toggleUserOptions = () => {
	openSidebar()
}
</script>

<template>
	<div
		class="flex h-14 w-screen items-center justify-between bg-primary px-4">
		<div>
			<Icon
				name="user"
				size="36"
				ref="userIcon"
				@click="toggleUserOptions()" />
		</div>
		<div class="flex gap-4">
			<Icon
				name="twitter"
				size="28"
				class="text-sky-500" />
		</div>
		<div class="invisible h-8 w-8"></div>
	</div>
</template>
