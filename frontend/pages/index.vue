<script setup lang="ts">
import { z } from 'zod'
type Posts = z.infer<typeof PostsValidator>

const posts = ref<Posts>([])
const lastPost = ref<Number>(0)

const responseValidator = z.object({
  status: z.number(),
  data: z.unknown().array(),
})

const getPosts = async () => {
  const data = await $fetch('http://dev.local:8000/api/posts', {
    method: 'GET',
    params: { lastPost: lastPost.value },
  })

  const response = responseValidator.parse(data)

  posts.value = [...posts.value, ...parsePosts(response.data)]
  lastPost.value = posts.value[posts.value.length - 1].sequence
}

onMounted(() => {
  getPosts()
})
</script>

<template>
  <div>
    <div class="flex w-full items-center justify-center">
      <div class="flex w-1/2 flex-col gap-4 px-4 pb-10 pt-2 2xl:w-1/3">
        <div v-if="posts" v-for="post in posts">
          <PostCard :title="post.title" :description="post.description" />
        </div>
        <button @click="getPosts()">More {{ lastPost }}</button>
      </div>
    </div>
  </div>
</template>
