const openUrl = (url: string) => {
	window.open(url, '_blank')
}

const openUserProfile = () => {
	useRouter().push('/profile')
}

const useSidebar = () => useState<Boolean>('isSidebarActive', () => false)
const openSidebar = () => [(useSidebar().value = true)]
const closeSidebar = () => [(useSidebar().value = false)]

export { closeSidebar, openSidebar, openUrl, openUserProfile, useSidebar }
