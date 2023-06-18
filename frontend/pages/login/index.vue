<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

const user = useUser()

const userCredential = reactive({
    email: '',
    password: '',
})

const isSigningIn = ref<Boolean>(false)

const errors = reactive({
    email: '',
    password: '',
    user: '',
})

const login = async () => {
    isSigningIn.value = true
    const error = await userLogin(userCredential.email, userCredential.password)

    if (error) {
        errors.email = error.email ? error.email._errors.join(',') : ''
        errors.password = error.password ? error.password._errors.join(',') : ''
        // errors.user = error.user ? error.user._errors.join(',') : ''
    }

    setTimeout(() => (isSigningIn.value = false), 500)
}

watch(
    () => user.value,
    () => {
        if (user.value) useRouter().push('/')
    }
)
</script>

<template>
    <div class="absolute flex h-screen w-screen items-center justify-center">
        <div
            class="flex w-96 flex-col items-center justify-center gap-2 rounded-xl border border-lightgray bg-secondary p-6">
            <label class="mt-2 w-full"> Email </label>
            <input type="text" v-model="userCredential.email" class="w-full rounded-md border border-lightgray p-2" />
            <span v-if="errors.email" class="w-full text-red-400">
                {{ errors.email }}
            </span>

            <label class="mt-2 w-full"> Password </label>
            <input type="password" v-model="userCredential.password"
                class="w-full rounded-md border border-lightgray p-2" />
            <span v-if="errors.password" class="w-full text-red-400">
                {{ errors.password }}
            </span>

            <div v-if="errors.user" class="mt-4 text-red-400">
                {{ errors.user }}
            </div>

            <button @click="login()" class="mt-6 flex gap-2 rounded-full border border-lightgray bg-blue-500 px-6 py-2">
                <Icon v-if="isSigningIn" name="loading" />
                <div> Sign In </div>
            </button>
        </div>
    </div>
</template>
