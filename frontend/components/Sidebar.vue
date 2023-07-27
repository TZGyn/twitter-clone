<script setup lang="ts">
const isSidebarActive = useSidebar()
const user = useUser()

const sidebar = ref<HTMLElement | undefined>()

type UserOption = {
	title: string
	icon?: string
	onClick: () => void
}

const userOptions: Array<UserOption> = [
	{
		title: 'Github',
		icon: 'github',
		onClick: () => {
			openUrl('https://github.com/TZGyn')
		},
	},
	{
		title: 'Log Out',
		icon: 'mdi:logout',
		onClick: async () => {
			await userLogout()
			useRouter().push('/login')
		},
	},
	{
		title: 'Profile',
		icon: 'user',
		onClick: () => openUserProfile(),
	},
]

onClickOutside(sidebar, () => {
	closeSidebar()
})
</script>

<template>
	<div>
		<div
			ref="sidebar"
			class="absolute z-50 h-screen w-80 max-w-full border-r-2 border-r-secondary bg-primary font-bold transition-transform"
			:class="{
				'-translate-x-full': !isSidebarActive,
				'translate-x-0': isSidebarActive,
			}">
			<div class="mb-4 flex flex-col gap-4 p-4">
				<div class="flex justify-between">
					<div>Account Info</div>
					<Icon
						@click="closeSidebar()"
						name="close"
						class="hover:cursor-pointer" />
				</div>
				<Icon
					@click="openUserProfile()"
					name="user"
					size="36"
					ref="userIcon"
					class="hover:cursor-pointer" />
				<div
					@click="openUserProfile()"
					class="hover:cursor-pointer hover:underline">
					{{ user }}
				</div>
			</div>
			<div ref="userOptionsCard">
				<div
					v-for="userOption in userOptions"
					class="flex w-full items-center p-4 text-xl hover:cursor-pointer hover:bg-lightgray"
					@click="userOption.onClick()">
					<Icon
						v-if="userOption.icon"
						:name="userOption.icon"
						class="mr-6" />
					<div>
						{{ userOption.title }}
					</div>
				</div>
			</div>
		</div>
		<div
			class="absolute z-40 h-screen w-screen bg-white/5"
			:class="{
				'-translate-x-full': !isSidebarActive,
				'translate-x-0': isSidebarActive,
			}">
		</div>
	</div>
</template>
