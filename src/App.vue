<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 加载屏幕 -->
    <LoadingScreen v-if="isLoading" />
    
    <!-- 主应用内容 -->
    <div v-else>
      <Header />
      <main class="flex-1">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <Footer />
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Sidebar from '@/components/Sidebar.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'

const isLoading = ref(true)

onMounted(() => {
  // 3秒后隐藏加载屏幕
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
