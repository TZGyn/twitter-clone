<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
})

const posts = usePosts()
const openCreatePostModal = ref<Boolean>(false)
const pageType = ref<'following' | 'for you'>('for you')
const isLoading = ref<Boolean>(false)

const getPosts = async (order?: 'new' | 'old') => {
	isLoading.value = true
	await fetchPosts(order)
	isLoading.value = false
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

const postsView = ref<HTMLElement | null>(null)

useInfiniteScroll(
	postsView,
	() => {
		getPosts()
	},
	{
		distance: 0,
		interval: 7000,
	}
)

onMounted(() => {
	getPosts()
})
</script>

<template>
	<div class="h-screen overflow-hidden">
		<Sidebar />
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
		<div class="flex w-full items-center justify-center">
			<div
				ref="postsView"
				class="flex h-screen w-full max-w-2xl flex-col items-center overflow-scroll pb-48">
				<PostCard
					v-for="post in posts"
					:post="post" />
				<div class="mt-4">
					<Icon
						v-if="isLoading"
						name="loading"
						size="32"
						class="text-accent" />
				</div>
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

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
	display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hidden {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
