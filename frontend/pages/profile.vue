<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
})

const user = useUser()

const deleteUser = async () => {
	await userDelete()
}
</script>

<template>
	<div>
		<button @click="deleteUser()">Delete Account</button>
	</div>
</template>
