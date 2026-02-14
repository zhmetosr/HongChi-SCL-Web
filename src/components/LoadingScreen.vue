<template>
  <div class="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50 p-4">
    <div class="flex items-center">
      <img 
        src="/logo.png" 
        alt="鸿驰祥瑞物流" 
        class="w-auto h-16 object-contain mr-4 animate-pulse"
      />
      <div>
        <h1 v-if="currentLanguage === 'zh'" class="text-2xl font-bold text-white animate-pulse">北京鸿驰祥瑞物流有限公司</h1>
        <h1 v-else class="text-2xl font-bold text-white animate-pulse">International Station Welcome You</h1>
        <h2 class="text-lg text-white/80 animate-pulse">Beijing Hongchi Xiangrui Logistics Co., Ltd.</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLanguage = ref('zh')

// 直接从localStorage读取语言设置
onBeforeMount(() => {
  const savedLang = localStorage.getItem('language')
  if (savedLang) {
    currentLanguage.value = savedLang
  }
})

onMounted(() => {
  // 3秒后跳转到首页
  setTimeout(() => {
    router.push('/')
  }, 3000)
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>