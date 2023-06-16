export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useUser()
	await getUser()

	if (!user.value && to.path !== '/login' && to.path.startsWith('/')) {
		return navigateTo('/login')
	}

	if (user.value && to.path === '/login') {
		return navigateTo('/')
	}
})
