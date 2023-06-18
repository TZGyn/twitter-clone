<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

import { z } from 'zod'

type Posts = z.infer<typeof PostsValidator>

const posts = ref<Posts>([])
const lastPost = ref<Number>(0)

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

onMounted(() => {
    getPosts()
})
</script>

<template>
    <div>
        <Header />
        <div class="mt-16 flex w-full items-center justify-center">
            <div class="flex w-1/2 flex-col gap-4 px-4 pb-10 pt-4 2xl:w-1/3">
                <div v-if="posts" v-for="post in posts">
                    <PostCard :title="post.title" :description="post.description" />
                </div>
                <button @click="getPosts()">More {{ lastPost }}</button>
            </div>
        </div>
    </div>
</template>
