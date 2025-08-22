<template>
  <div id="app">
    <NavBar v-if="isAuthenticated" />
    <main class="min-h-screen bg-gray-100">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'

const isAuthenticated = ref(!!localStorage.getItem('authToken'))
const router = useRouter()

watch(() => router.currentRoute.value, () => {
  isAuthenticated.value = !!localStorage.getItem('authToken')
})

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('authToken')
})
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>