<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Products</h1>
            <div class="flex space-x-4">
                <select v-model="selectedCategory" class="border rounded px-3 py-2">
                    <option value="">All Categories</option>
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
                <input type="text" placeholder="Search products..." v-model="searchQuery"
                    class="border rounded px-3 py-2">
            </div>
        </div>

        <LoadingSpinner v-if="loading" />
        <ErrorMessage v-else-if="error" :message="error" :on-retry="fetchProducts" />

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>

        <div v-if="!loading && !error" class="mt-8 flex justify-center">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Previous
            </button>
            <span class="mx-2 px-3 py-1">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref(null)
const selectedCategory = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 8

onMounted(() => {
    fetchProducts()
    fetchCategories()
})

const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await productsAPI.getAll()
        products.value = response.data
    } catch (err) {
        error.value = 'Failed to load products. Please try again.'
    } finally {
        loading.value = false
    }
}

const fetchCategories = async () => {
    try {
        const response = await productsAPI.getCategories()
        categories.value = response.data
    } catch (err) {
        console.error('Failed to load categories:', err)
    }
}

const filteredProducts = computed(() => {
    let filtered = products.value

    if (selectedCategory.value) {
        filtered = filtered.filter(product =>
            product.category === selectedCategory.value
        )
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
    }

    const startIndex = (currentPage.value - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
})

const totalPages = computed(() => {
    let filtered = products.value
    if (selectedCategory.value) {
        filtered = filtered.filter(product =>
            product.category === selectedCategory.value
        )
    }
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
    }
    return Math.ceil(filtered.length / itemsPerPage)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}
</script>