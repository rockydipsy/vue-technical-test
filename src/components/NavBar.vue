<template>
    <nav class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="text-xl font-bold">Vue Dashboard</router-link>
            <div class="flex items-center space-x-4">
                <router-link to="/"
                    class="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
                    :class="{ 'text-blue-600 bg-blue-50': $route.name === 'Products' }">
                    Products
                </router-link>
                <router-link to="/cart"
                    class="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium flex items-center"
                    :class="{ 'text-blue-600 bg-blue-50': $route.name === 'Cart' }">
                    <span>Cart</span>
                    <span v-if="cartCount > 0"
                        class="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {{ cartCount }}
                    </span>
                </router-link>
                <span v-if="user">Hello, {{ user.username || user.name }}</span>
                <button @click="logout"
                    class="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors group"
                    title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span class="hidden md:inline text-sm">Logout</span>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useStore } from '../store'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const user = computed(() => store.user)
const cartCount = computed(() => store.cartCount)

const userInitials = computed(() => {
    if (!user.value) return 'U'
    if (user.value.name) {
        return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    }
    if (user.value.username) {
        return user.value.username.substring(0, 2).toUpperCase()
    }
    return 'U'
})

const handleAuthChange = (event) => {
    if (event.detail.isAuthenticated) {
        store.setUser(event.detail.user)
    } else {
        store.setUser(null)
        store.clearCart()
    }
}

onMounted(() => {
    window.addEventListener('auth-change', handleAuthChange)
})

onUnmounted(() => {
    window.removeEventListener('auth-change', handleAuthChange)
})

const logout = () => {
    localStorage.removeItem('authToken')
    store.setUser(null)
    store.clearCart()

    window.dispatchEvent(new CustomEvent('auth-change', {
        detail: { isAuthenticated: false }
    }))

    router.push('/login')
}
</script>