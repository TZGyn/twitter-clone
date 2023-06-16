import { z } from 'zod'

const PostValidator = z.object({
	sequence: z.number(),
	id: z.string(),
	title: z.string(),
	description: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
})

const parsePost = (data: unknown) => {
	return PostValidator.parse(data)
}

const PostsValidator = PostValidator.array()

const parsePosts = (data: unknown[]) => {
	return PostsValidator.parse(data)
}

export { parsePost, parsePosts, PostsValidator, PostValidator }
