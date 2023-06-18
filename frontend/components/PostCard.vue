<script setup lang="ts">
type Post = {
    title: String
    description: String | null | undefined
}

const props = defineProps<Post>()
</script>

<template>
    <div>
        <div class="flex w-full flex-col gap-6 rounded-md border border-lightgray bg-secondary p-6">
            <div class="h-full truncate text-xl font-bold">
                {{ props.title }}
            </div>
            <div class="h-full">
                {{ props.description }}
            </div>
        </div>
    </div>
</template>
