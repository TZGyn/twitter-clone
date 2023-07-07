<script setup lang="ts">
type Post = {
	user: {
		name: String
	}
	description: String
	created_at: string
}

const props = defineProps<Post>()

const now = new Date().toLocaleDateString()

const postTime = new Date(props.created_at)

const displayTime = () => {
    if (now == postTime.toLocaleDateString()) {
        return postTime.toLocaleTimeString()
    }
    return postTime.toLocaleDateString()
}
</script>

<template>
	<div>
		<div class="flex w-full gap-4 border border-lightgray p-6">
			<div>
				<Icon
					name="user"
					size="40" />
			</div>
			<div class="flex w-full flex-col gap-2">
				<div class="flex w-full justify-between">
					<div class="flex h-full gap-4 font-bold">
						{{ props.user.name }}
					</div>
					<div>
						{{ displayTime() }}
					</div>
				</div>
				<div class="h-full whitespace-pre-line">
					{{ props.description }}
				</div>
			</div>
		</div>
	</div>
</template>
