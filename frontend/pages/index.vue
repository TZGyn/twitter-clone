<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
})

const posts = usePosts()
const openCreatePostModal = ref<Boolean>(false)
const pageType = ref<'following' | 'for you'>('for you')

const getPosts = async () => {
	await fetchPosts()
}

const toggleCreatePostModal = () => {
	openCreatePostModal.value = !openCreatePostModal.value
}

const changePageType = (type: 'following' | 'for you') => {
	pageType.value = type
}

const createPost = () => {
	navigateTo('/compose/tweet')
	// toggleCreatePostModal()
}

onMounted(() => {
	getPosts()
})
</script>

<template>
	<div>
		<Header />
		<div class="sticky top-0 flex bg-primary text-center">
			<div
				@click="changePageType('for you')"
				class="flex w-full flex-col items-center hover:bg-white/10">
				<div>
					<div
						class="py-4"
						:class="{
							'font-bold': pageType === 'for you',
						}">
						For you
					</div>
					<div
						class="w-full border-2 border-sky-500"
						:class="{
							invisible: pageType !== 'for you',
						}">
					</div>
				</div>
			</div>
			<div
				@click="changePageType('following')"
				class="flex w-full flex-col items-center hover:bg-white/10">
				<div>
					<div
						class="py-4"
						:class="{
							'font-bold': pageType === 'following',
						}">
						Following
					</div>
					<div
						class="w-full border-2 border-sky-500"
						:class="{
							invisible: pageType !== 'following',
						}">
					</div>
				</div>
			</div>
		</div>
		<div class="mb-16 flex w-full items-center justify-center">
			<div class="flex w-full max-w-2xl flex-col">
				<div
					v-if="posts"
					v-for="post in posts">
					<PostCard :post="post" />
				</div>
				<button @click="getPosts()">More</button>
			</div>
		</div>
		<button
			@click="createPost()"
			class="fixed bottom-16 right-6 flex items-center justify-center gap-2 rounded-full bg-sky-500 p-4">
			<Icon name="mdi:feather" />
		</button>
		<ModalCreatePost
			v-if="openCreatePostModal"
			@close="toggleCreatePostModal()" />
		<BottomNavigationBar />
	</div>
</template>
