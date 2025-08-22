<template>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error! </strong>
        <span class="block sm:inline">{{ message }}</span>
        <button v-if="onRetry" @click="onRetry" class="ml-4 bg-red-500 text-white px-2 py-1 rounded">
            Try Again
        </button>
    </div>
</template>

<script setup>
defineProps({
    message: String,
    onRetry: Function
})
</script>