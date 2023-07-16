import { z } from 'zod'

const PostValidator = z.object({
	sequence: z.number(),
	id: z.string(),
	description: z.string(),
	created_at: z.string().datetime(),
	updated_at: z.string(),
	user: z.object({
		name: z.string(),
	}),
	like_count: z.number(),
})

const newPostValidator = z.object({
	title: z.string(),
	description: z.string(),
})

const parsePost = (data: unknown) => {
	return PostValidator.parse(data)
}

const PostsValidator = PostValidator.array()

const parsePosts = (data: unknown[]) => {
	return PostsValidator.parse(data)
}

type Posts = z.infer<typeof PostsValidator>

const usePosts = () => useState<Posts>(() => [])

const createNewPost = async (data: unknown) => {
	const parsedNewPost = newPostValidator.safeParse(data)

	if (!parsedNewPost.success) return

	await useCustomFetch('/api/posts', {
		method: 'POST',
		body: parsedNewPost.data,
	})

	await fetchPosts('new')
}

const responseValidator = z.object({
	status: z.number(),
	data: z.unknown().array(),
})

const fetchPosts = async (
	order: 'new' | 'old' = 'old',
	refresh: Boolean = false
) => {
	const posts = usePosts()
	const lastPost = refresh
		? 0
		: posts.value.length
		? posts.value[posts.value.length - 1].sequence
		: 0
	const firstPost = posts.value.length ? posts.value[0].sequence : 0

	const { data } = await useCustomFetch('/api/posts', {
		params: { lastPost: lastPost, firstPost: firstPost, order: order },
	})

	const response = responseValidator.safeParse(data.value)

	if (!response.success) return

	if (order == 'old') {
		posts.value = [...posts.value, ...parsePosts(response.data.data)]
	} else {
		posts.value = [...parsePosts(response.data.data), ...posts.value]
	}
}

export {
	createNewPost,
	fetchPosts,
	parsePost,
	parsePosts,
	PostValidator,
	usePosts,
}
