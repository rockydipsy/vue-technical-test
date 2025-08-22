<template>
    <div class="container mx-auto px-4 py-8">
        <LoadingSpinner v-if="loading" />
        <ErrorMessage v-else-if="error" :message="error" :on-retry="fetchProduct" />

        <div v-else-if="product" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div class="md:flex">
                <div class="md:flex-shrink-0 md:w-1/2 p-8">
                    <img :src="product.image" :alt="product.title" class="w-full h-64 object-contain">
                </div>
                <div class="p-8 md:w-1/2">
                    <div class="uppercase tracking-wide text-sm text-blue-500 font-semibold">{{ product.category }}
                    </div>
                    <h1 class="block mt-1 text-lg leading-tight font-medium text-black">{{ product.title }}</h1>
                    <p class="mt-2 text-gray-500">{{ product.description }}</p>
                    <div class="mt-4">
                        <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
                        <div class="mt-4 flex items-center">
                            <span class="text-yellow-500">★★★★☆</span>
                            <span class="ml-2 text-gray-600">({{ product.rating?.count }} reviews)</span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button @click="addToCart"
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            Add to Cart
                        </button>
                        <router-link to="/" class="ml-4 text-blue-500 hover:underline">Back to Products</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import { productsAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const product = ref(null)
const loading = ref(false)
const error = ref(null)
const route = useRoute()
const store = useStore()

onMounted(() => {
    fetchProduct()
})

const fetchProduct = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await productsAPI.getById(route.params.id)
        product.value = response.data
    } catch (err) {
        error.value = 'Failed to load product details. Please try again.'
    } finally {
        loading.value = false
    }
}

const addToCart = () => {
    store.addToCart(product.value)
}
</script>