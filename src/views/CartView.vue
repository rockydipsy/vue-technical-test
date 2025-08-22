<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div v-if="cart.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
            <p class="text-gray-500 text-lg">Your cart is empty</p>
            <router-link to="/" class="text-blue-500 hover:underline mt-4 inline-block">Continue Shopping</router-link>
        </div>

        <div v-else class="md:flex md:space-x-6">
            <div class="md:w-2/3">
                <div v-for="item in cart" :key="item.id" class="bg-white rounded-lg shadow-md p-4 mb-4 flex">
                    <img :src="item.image" :alt="item.title" class="w-20 h-20 object-contain">
                    <div class="ml-4 flex-grow">
                        <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                        <p class="text-blue-600 font-bold">${{ item.price }}</p>
                        <div class="flex items-center mt-2">
                            <label for="quantity" class="mr-2">Quantity:</label>
                            <input type="number" v-model="item.quantity" min="1"
                                @change="updateQuantity(item.id, item.quantity)" class="w-16 border rounded px-2 py-1">
                            <button @click="removeItem(item.id)" class="ml-4 text-red-500 hover:text-red-700">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/3 mt-6 md:mt-0">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
                    <div class="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${{ cartTotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>$10.00</span>
                    </div>
                    <div class="flex justify-between mb-4 font-bold text-lg">
                        <span>Total</span>
                        <span>${{ (cartTotal + 10).toFixed(2) }}</span>
                    </div>
                    <button @click="checkout"
                        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const cart = computed(() => store.cart)
const cartTotal = computed(() => store.cartTotal)

const updateQuantity = (productId, quantity) => {
    if (quantity < 1) quantity = 1
    store.updateQuantity(productId, parseInt(quantity))
}

const removeItem = (productId) => {
    store.removeFromCart(productId)
}

const checkout = () => {
    alert('Checkout success!')
    store.clearCart()
    router.push('/')
}
</script>