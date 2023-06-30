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
    function: () => void
}

const userOptions: Array<UserOption> = [
    {
        title: 'Github',
        function: () => {
            openUrl('https://github.com/TZGyn')
            toggleUserOptions()
        },
    },
    {
        title: 'Log Out',
        function: async () => {
            await logout()
            toggleUserOptions()
        },
    },
]
</script>

<template>
    <div
        class="fixed top-0 flex h-16 w-screen items-center justify-between border-b-2 border-b-lightgray bg-secondary px-4">
        <div class="flex gap-4">
            <Icon name="twitter" />
            <div class="font-bold"> Twitter Clone </div>
        </div>
        <div class="relative">
            <Icon name="user" size="28" ref="userIcon" @click="toggleUserOptions()" />
            <div v-if="showUserOptions" ref="userOptionsCard"
                class="absolute right-0 top-8 w-max border border-lightgray bg-secondary">
                <div v-for="userOption in userOptions"
                    class="w-full min-w-[120px] border border-lightgray p-4 text-center hover:bg-lightgray"
                    @click="userOption.function()">
                    {{ userOption.title }}
                </div>
            </div>
        </div>
    </div>
</template>
