<template>
  <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
    <div class="flex flex-col items-center space-y-4 bg-white rounded-full shadow-lg p-4">
      <!-- 技术合作 -->
      <div class="relative group">
        <button @click="scrollToFooter" class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
        <div class="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-md px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <span class="text-gray-800 text-sm">技术合作</span>
        </div>
      </div>
      
      <!-- 商务合作 -->
      <div class="relative group">
        <button @click="scrollToFooter" class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <div class="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-md px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <span class="text-gray-800 text-sm">商务合作</span>
        </div>
      </div>
      
      <!-- 物流查询 -->
      <div class="relative group">
        <router-link to="/logistics-tracking" class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </router-link>
        <div class="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-md px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <span class="text-gray-800 text-sm">物流查询</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 滚动到底部
const scrollToFooter = () => {
  const footer = document.querySelector('footer')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>