<script setup lang="ts">
const back = () => {
	navigateTo('/')
}
</script>

<template>
	<div>
		<div class="flex h-14 w-full items-center justify-between px-4">
			<Icon
				name="back"
				@click="back()" />
			<!-- <input type="text" /> -->
			<div></div>
			<button
				class="rounded-full bg-accent px-4 py-2 text-sm font-semibold">
				<div> Tweet </div>
			</button>
		</div>
		<div></div>
		<BottomNavigationBar />
	</div>
</template>
