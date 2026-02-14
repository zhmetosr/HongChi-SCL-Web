<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold text-gray-800">{{ t('dropdown.logisticsTracking') }}</h1>
        <p class="text-gray-600 mt-2">{{ t('home.coreServicesDesc') }}</p>
      </div>
    </div>
    
    <!-- 查询表单 -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="trackShipment" class="space-y-6">
          <div>
            <label for="trackingNumber" class="block text-gray-700 font-medium mb-2">物流单号</label>
            <input 
              type="text" 
              id="trackingNumber" 
              v-model="trackingNumber" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="请输入物流单号"
              required
            />
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">运输方式</label>
            <div class="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                @click="transportMode = 'air'"
                class="py-3 px-4 border rounded-lg transition-colors" 
                :class="transportMode === 'air' ? 'border-primary bg-primary-light text-primary' : 'border-gray-300 hover:border-gray-400'"
              >
                空运
              </button>
              <button 
                type="button" 
                @click="transportMode = 'sea'"
                class="py-3 px-4 border rounded-lg transition-colors" 
                :class="transportMode === 'sea' ? 'border-primary bg-primary-light text-primary' : 'border-gray-300 hover:border-gray-400'"
              >
                海运
              </button>
              <button 
                type="button" 
                @click="transportMode = 'rail'"
                class="py-3 px-4 border rounded-lg transition-colors" 
                :class="transportMode === 'rail' ? 'border-primary bg-primary-light text-primary' : 'border-gray-300 hover:border-gray-400'"
              >
                铁路
              </button>
              <button 
                type="button" 
                @click="transportMode = 'road'"
                class="py-3 px-4 border rounded-lg transition-colors" 
                :class="transportMode === 'road' ? 'border-primary bg-primary-light text-primary' : 'border-gray-300 hover:border-gray-400'"
              >
                公路
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors font-medium"
            :disabled="isLoading"
          >
            {{ isLoading ? '查询中...' : '查询物流' }}
          </button>
        </form>
      </div>
      
      <!-- 查询结果 -->
      <div v-if="showResult" class="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">物流查询结果</h2>
        
        <div class="border-b border-gray-200 pb-4 mb-4">
          <div class="flex flex-col md:flex-row md:justify-between">
            <div>
              <p class="text-gray-600">物流单号: <span class="font-medium text-gray-800">{{ trackingNumber }}</span></p>
              <p class="text-gray-600 mt-1">运输方式: <span class="font-medium text-gray-800">{{ transportModeText }}</span></p>
            </div>
            <div>
              <p class="text-gray-600">当前状态: <span class="font-medium text-primary">{{ shipmentStatus }}</span></p>
              <p class="text-gray-600 mt-1">查询时间: <span class="font-medium text-gray-800">{{ new Date().toLocaleString() }}</span></p>
            </div>
          </div>
        </div>
        
        <!-- 物流轨迹 -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-800">物流轨迹</h3>
          
          <div class="relative">
            <!-- 轨迹线 -->
            <div class="absolute left-4 top-0 bottom-0 w-0-5 bg-gray-200"></div>
            
            <!-- 轨迹点 -->
            <div v-for="(item, index) in trackingHistory" :key="index" class="relative pl-12 pb-6">
              <!-- 时间线节点 -->
              <div class="absolute left-2 top-1 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm"></div>
              
              <!-- 轨迹信息 -->
              <div>
                <p class="font-medium text-gray-800">{{ item.status }}</p>
                <p class="text-gray-600 mt-1">{{ item.location }}</p>
                <p class="text-gray-500 text-sm mt-1">{{ item.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 表单数据
const trackingNumber = ref('')
const transportMode = ref('air')
const isLoading = ref(false)
const showResult = ref(false)

// 物流状态
const shipmentStatus = ref('运输中')

// 运输方式文本
const transportModeText = computed(() => {
  const modes = {
    air: '空运',
    sea: '海运',
    rail: '铁路',
    road: '公路'
  }
  return modes[transportMode.value] || '空运'
})

// 物流轨迹
const trackingHistory = ref([
  {
    status: '已发货',
    location: '北京市朝阳区',
    time: '2026-02-10 10:30:00'
  },
  {
    status: '运输中',
    location: '上海市浦东新区',
    time: '2026-02-10 16:45:00'
  },
  {
    status: '运输中',
    location: '广州市白云区',
    time: '2026-02-11 08:20:00'
  }
])

// 查询物流
const trackShipment = () => {
  isLoading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    isLoading.value = false
    showResult.value = true
  }, 1000)
}
</script>

<style scoped>
/* 自定义样式 */
.min-h-screen {
  min-height: 100vh;
}

.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.container {
  width: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-bold {
  font-weight: 700;
}

.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}

.mt-2 {
  margin-top: 0.5rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.max-w-2xl {
  max-width: 40rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.p-8 {
  padding: 2rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.block {
  display: block;
}

.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}

.font-medium {
  font-weight: 500;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.w-full {
  width: 100%;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.border {
  border-width: 1px;
}

.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-primary:focus {
  --tw-ring-color: #165DFF;
}

.focus\:border-primary:focus {
  --tw-border-color: #165DFF;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.placeholder\:text-gray-400::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgb(156 163 175 / var(--tw-placeholder-opacity));
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.hover\:border-gray-400:hover {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(22 93 255 / var(--tw-bg-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.hover\:bg-primary-hover:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(64 128 255 / var(--tw-bg-opacity));
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.max-w-4xl {
  max-width: 56rem;
}

.mt-8 {
  margin-top: 2rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.border-b {
  border-bottom-width: 1px;
}

.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}

.pb-4 {
  padding-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.md\:flex-row {
  flex-direction: row;
}

.md\:justify-between {
  justify-content: space-between;
}

.mt-1 {
  margin-top: 0.25rem;
}

.font-medium {
  font-weight: 500;
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(22 93 255 / var(--tw-text-opacity));
}

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.5rem;
}

.font-semibold {
  font-weight: 600;
}

.relative {
  position: relative;
}

.pl-12 {
  padding-left: 3rem;
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.absolute {
  position: absolute;
}

.left-4 {
  left: 1rem;
}

.top-0 {
  top: 0;
}

.bottom-0 {
  bottom: 0;
}

.w-0-5 {
  width: 0.125rem;
}

.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

.left-2 {
  left: 0.5rem;
}

.top-1 {
  top: 0.25rem;
}

.w-4 {
  width: 1rem;
}

.h-4 {
  height: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

.border-2 {
  border-width: 2px;
}

.border-white {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>