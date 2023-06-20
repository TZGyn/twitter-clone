import { z } from 'zod'

const PostValidator = z.object({
    sequence: z.number(),
    id: z.string(),
    title: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
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

    const res = await request.post('/api/posts', parsedNewPost.data)

    console.log(res)
}

export { parsePost, parsePosts, PostValidator, createNewPost, usePosts }
