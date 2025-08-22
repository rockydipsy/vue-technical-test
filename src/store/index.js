import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStore = defineStore('main', () => {
    const user = ref(null)
    const cart = ref([])
    const loading = ref(false)
    const error = ref(null)

    const cartCount = computed(() =>
        cart.value.reduce((total, item) => total + item.quantity, 0)
    )

    const cartTotal = computed(() =>
        cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    )

    function setUser(userData) {
        user.value = userData
    }

    function addToCart(product) {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            cart.value.push({ ...product, quantity: 1 })
        }
    }

    function removeFromCart(productId) {
        cart.value = cart.value.filter(item => item.id !== productId)
    }

    function updateQuantity(productId, quantity) {
        const item = cart.value.find(item => item.id === productId)
        if (item) {
            item.quantity = quantity
        }
    }

    function clearCart() {
        cart.value = []
    }

    function setLoading(loadingState) {
        loading.value = loadingState
    }

    function setError(errorMessage) {
        error.value = errorMessage
    }

    return {
        user,
        cart,
        loading,
        error,
        cartCount,
        cartTotal,
        setUser,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setLoading,
        setError
    }
})