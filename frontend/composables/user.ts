import { z } from 'zod'

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const loggedInUserSchema = z.object({
    name: z.string(),
})

const userLogin = async (email: String, password: String) => {
    await getUser()
    if (useUser().value) return

    const user = userSchema.safeParse({ email, password })

    if (!user.success) return user.error.format()

    await request.get('/sanctum/csrf-cookie')
    await request.post('/login', user.data)

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

    await request.post('/register', newUser.data)

    await getUser()
}

const getUser = async () => {
    await request
        .get('/api/user')
        .then(({ data }) => {
            const parsed = loggedInUserSchema.safeParse(data)
            if (!parsed.success) return
            useUser().value = parsed.data.name
        })
        .catch((error) => {
            console.log(error)
        })
}

const userLogout = async () => {
    await request.post('/logout')
    useUser().value = ''
}

const useUser = () => useState<String>('user', () => '')

export { userLogin, useUser, getUser, userLogout, userSignup }
