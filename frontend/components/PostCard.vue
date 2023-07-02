<script setup lang="ts">
type Post = {
    user: {
        name: String
    }
    title: String
    description: String
    created_at: string
}

const props = defineProps<Post>()
</script>

<template>
    <div>
        <div class="flex w-full flex-col gap-6 rounded-md border border-lightgray bg-secondary p-6">
            <div class="flex justify-between">
                <div class="flex h-full gap-4">
                    <Icon name="user" />
                    {{ props.user.name }}
                </div>
                <div>
                    {{ new Date(props.created_at).toLocaleString() }}
                </div>
            </div>
            <div class="h-full truncate text-xl font-bold">
                {{ props.title }}
            </div>
            <div class="h-full">
                {{ props.description }}
            </div>
        </div>
    </div>
</template>
