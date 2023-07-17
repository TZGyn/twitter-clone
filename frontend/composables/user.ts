import { z } from 'zod'

const userSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

const loggedInUserSchema = z.object({
	name: z.string(),
})

const useUser = () => useState<String>('user', () => '')

const userLogin = async (email: String, password: String) => {
	await getUser()
	if (useUser().value) return

	const user = userSchema.safeParse({ email, password })

	if (!user.success) return user.error.flatten().fieldErrors

	await useCustomFetch('/sanctum/csrf-cookie')
	const { error } = await useCustomFetch('/login', {
		method: 'POST',
		body: user.data,
	})

	if (error.value) return { user: 'Invalid User' }

	await getUser()
}

const newUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	password_confirmation: z.string().min(6),
})

const userSignup = async (data: unknown) => {
	const newUser = newUserSchema.safeParse(data)

	if (!newUser.success) return newUser.error.format()

	const { error } = await useCustomFetch('/register', {
		method: 'POST',
		body: newUser.data,
	})

	if (error.value) return error

	await getUser()
}

const getUser = async () => {
	const { data, error } = await useCustomFetch('/api/user')

	if (error.value) return

	const parsed = loggedInUserSchema.safeParse(data.value)
	if (!parsed.success) return
	useUser().value = parsed.data.name
}

const userLogout = async () => {
	await useCustomFetch('/logout', { method: 'POST' })
	useUser().value = ''
}

const userDelete = async () => {
	await useCustomFetch('/user', { method: 'DELETE' })
	useUser().value = ''
}

export { getUser, userDelete, userLogin, userLogout, userSignup, useUser }
