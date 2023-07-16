<script setup lang="ts">
type Post = {
	user: {
		name: string
	}
	id: string
	description: string
	created_at: string
	like_count: number
}

type Props = {
	post: Post
}

const dummy = reactive({
	comment_count: 100,
	retweet_count: 100,
})

const props = defineProps<Props>()
const post = props.post

const now = new Date().toLocaleDateString()
const postTime = new Date(post.created_at)

const displayTime = () => {
	if (now == postTime.toLocaleDateString()) {
		return postTime.toLocaleTimeString()
	}
	return postTime.toLocaleDateString()
}

const showPost = () => {
	return
	navigateTo(`/post/${post.id}`)
}

const liked = ref<Boolean>(false)

const toggleComment = () => {}
const toggleRetweet = () => {}
const toggleLike = () => {
	post.like_count += liked.value ? -1 : 1
	liked.value = !liked.value
}
</script>

<template>
	<div>
		<div
			@click="showPost()"
			class="flex w-full gap-4 border border-lightgray px-4 py-2 hover:cursor-pointer">
			<div>
				<Icon
					name="user"
					size="40" />
			</div>
			<div class="flex w-full flex-col gap-2">
				<div class="mt-2 flex w-full justify-between">
					<div class="flex h-full gap-4 font-bold">
						{{ post.user.name }}
					</div>
					<div>
						{{ displayTime() }}
					</div>
				</div>
				<div class="h-full whitespace-pre-line">
					{{ post.description }}
				</div>
				<div class="my-2 flex select-none justify-between">
					<div
						@click="toggleComment()"
						class="flex items-center gap-2 hover:text-accent">
						<Icon
							name="uil:comment"
							size="20" />
						{{ dummy.comment_count }}
					</div>
					<div
						@click="toggleRetweet()"
						class="flex items-center gap-2 hover:text-green-500">
						<Icon
							name="ant-design:retweet-outlined"
							size="20" />
						{{ dummy.retweet_count }}
					</div>
					<div
						@click="toggleLike()"
						class="flex items-center gap-2 hover:text-red-500"
						:class="{ 'text-red-500': liked }">
						<Icon
							name="material-symbols:favorite-outline"
							size="20" />
						{{ post.like_count }}
					</div>
					<div class="flex items-center gap-2 hover:text-accent">
						<Icon
							name="material-symbols:upload"
							size="20" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
