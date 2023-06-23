<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

const user = useUser()

const userCredential = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const isSigningIn = ref<Boolean>(false)
const isSignUp = ref<Boolean>(false)

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

const toggleSignup = () => {
    isSignUp.value = !isSignUp.value
}

const signup = async () => {
    isSigningIn.value = true
    const error = await userSignup(userCredential)
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
            <label v-if="isSignUp" class="mt-2 w-full">
                Name
            </label>
            <input v-if="isSignUp" type="text" v-model="userCredential.name" class="w-full rounded-md" />

            <label class="mt-2 w-full"> Email </label>
            <input type="text" v-model="userCredential.email" class="w-full rounded-md" />
            <span v-if="errors.email" class="w-full text-red-400">
                {{ errors.email }}
            </span>

            <label class="mt-2 w-full"> Password </label>
            <input type="password" v-model="userCredential.password" class="w-full rounded-md" />
            <span v-if="errors.password" class="w-full text-red-400">
                {{ errors.password }}
            </span>

            <label v-if="isSignUp" class="mt-2 w-full">
                Password Confirmation
            </label>
            <input v-if="isSignUp" type="password" v-model="userCredential.password_confirmation"
                class="w-full rounded-md" />

            <div v-if="errors.user" class="mt-4 text-red-400">
                {{ errors.user }}
            </div>

            <button @click="isSignUp ? signup() : login()"
                class="mt-6 flex gap-2 rounded-full border border-lightgray bg-blue-500 px-6 py-2">
                <Icon v-if="isSigningIn" name="loading" />
                <div> {{ isSignUp ? 'Sign up' : 'Sign in' }} </div>
            </button>

            <div @click="toggleSignup()" class="mt-4 text-blue-500 underline">
                {{
                    isSignUp
                    ? 'Already have an account? Sign in'
                    : 'No account? Sign up'
                }}
            </div>
        </div>
    </div>
</template>
