<script setup lang="ts">
const openUrl = (url: string) => {
    window.open(url, '_blank')
}
</script>

<template>
    <div
        class="bg-secondary border-b-lightgray fixed top-0 flex h-16 w-screen items-center justify-between border-b-2 px-4">
        <div class="flex gap-4">
            <Icon name="twitter" />
            <div class="font-bold"> Twitter Clone </div>
        </div>
        <div>
            <Icon name="github" @click="openUrl('https://github.com/TZGyn/twitter-clone')" />
        </div>
    </div>
</template>
