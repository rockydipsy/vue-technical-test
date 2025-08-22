<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain p-4">
        <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 truncate">{{ product.title }}</h3>
            <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
            <p class="text-blue-600 font-bold mb-4">${{ product.price }}</p>
            <div class="flex justify-between items-center">
                <router-link :to="`/product/${product.id}`" class="text-blue-500 hover:underline">
                    View Details
                </router-link>
                <button @click="addToCart"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../store'

const props = defineProps({
    product: Object
})

const store = useStore()

const addToCart = () => {
    store.addToCart(props.product)
}
</script>