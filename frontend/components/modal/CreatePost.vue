<script setup lang="ts">
import { MaybeElement } from '@vueuse/core'

const emits = defineEmits(['close'])

const newPost = reactive({
    title: '',
    description: '',
})

const modal = ref<MaybeElement>()
const isSubmitting = ref<Boolean>(false)

const { textarea: descriptionTextArea, triggerResize } = useTextareaAutosize()

const closeModal = () => {
    emits('close')
}

const submitPost = async () => {
    isSubmitting.value = true

    await createNewPost(newPost)

    isSubmitting.value = false
    closeModal()
}

onClickOutside(modal, () => {
    closeModal()
})

watch(
    () => newPost.description,
    () => {
        triggerResize()
    }
)
</script>

<template>
    <div class="fixed top-0 flex h-screen w-screen justify-center">
        <div ref="modal"
            class="relative mx-4 mt-20 flex h-96 w-full max-w-3xl flex-col items-center border border-lightgray bg-secondary p-4">
            <label class="mt-2 w-full"> Title </label>
            <input type="text" v-model="newPost.title" class="mt-2 w-full rounded-md" />

            <textarea ref="descriptionTextArea" v-model="newPost.description" placeholder="Enter Description"
                class="mb-16 mt-8 w-full rounded-md"></textarea>

            <button @click="submitPost()"
                class="absolute bottom-6 flex gap-2 rounded-full border border-lightgray bg-blue-500 px-6 py-2">
                <Icon v-if="isSubmitting" name="loading" />
                <div> Tweet </div>
            </button>
        </div>
    </div>
</template>
