<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

import { z } from 'zod'

const posts = usePosts()
const lastPost = ref<Number>(0)
const openCreatePostModal = ref<Boolean>(false)

const responseValidator = z.object({
    status: z.number(),
    data: z.unknown().array(),
})

const getPosts = async () => {
    const data = await request.get('/api/posts', {
        params: { lastPost: lastPost.value },
    })

    console.log(data)

    const response = responseValidator.safeParse(data.data)

    if (!response.success) return

    posts.value = [...posts.value, ...parsePosts(response.data.data)]
    lastPost.value = posts.value[posts.value.length - 1].sequence
}

const logout = async () => {
    await userLogout()
    useRouter().push('/login')
}

const toggleCreatePostModal = () => {
    openCreatePostModal.value = !openCreatePostModal.value
}

const createPost = () => {
    toggleCreatePostModal()
}

onMounted(() => {
    getPosts()
})
</script>

<template>
    <div>
        <Header />
        <div class="mt-16 flex w-full items-center justify-center">
            <div class="flex w-1/2 flex-col gap-4 px-4 pb-10 pt-4 2xl:w-1/3">
                <button @click="getUserPosts()"> User Posts </button>
                <div v-if="posts" v-for="post in posts">
                    <PostCard :title="post.title" :description="post.description" />
                </div>
                <button @click="getPosts()">More {{ lastPost }}</button>
            </div>
        </div>
        <button @click="createPost()"
            class="fixed bottom-12 right-12 flex items-center justify-center gap-2 rounded-full bg-blue-500 p-4">
            <Icon name="plus" />
            Create Post
        </button>
        <ModalCreatePost v-if="openCreatePostModal" @close="toggleCreatePostModal()" />
    </div>
</template>
