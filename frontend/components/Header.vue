<script setup lang="ts">
const userOptionsCard = ref()
const userIcon = ref()
const showUserOptions = ref<Boolean>(false)

const toggleUserOptions = () => {
	showUserOptions.value = !showUserOptions.value
}

onClickOutside(
	userOptionsCard,
	() => {
		toggleUserOptions()
	},
	{ ignore: [userIcon] }
)

const logout = async () => {
	await userLogout()
	useRouter().push('/login')
}

type UserOption = {
	title: string
	onClick: () => void
}

const userOptions: Array<UserOption> = [
	{
		title: 'Github',
		onClick: () => {
			openUrl('https://github.com/TZGyn')
			toggleUserOptions()
		},
	},
	{
		title: 'Log Out',
		onClick: async () => {
			await logout()
			toggleUserOptions()
		},
	},
	{
		title: 'Profile',
		onClick: () => {
			useRouter().push('/profile')
		},
	},
]
</script>

<template>
	<div
		class="flex h-14 w-screen items-center justify-between bg-primary px-4">
		<div class="relative">
			<Icon
				name="user"
				size="36"
				ref="userIcon"
				@click="toggleUserOptions()" />
			<div
				v-if="showUserOptions"
				ref="userOptionsCard"
				class="absolute left-0 top-8 w-max border border-lightgray bg-secondary">
				<div
					v-for="userOption in userOptions"
					class="w-full min-w-[120px] border border-lightgray p-4 text-center hover:bg-lightgray"
					@click="userOption.onClick()">
					{{ userOption.title }}
				</div>
			</div>
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
