<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ t('userCenter.title') }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('userCenter.subtitle') }}</p>
      </div>
    </section>

    <!-- 用户中心内容 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- 侧边导航 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- 侧边栏 -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-20">
                <!-- 用户信息 -->
                <div class="text-center mb-8">
                  <div class="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold text-primary">
                    {{ userNameInitial }}
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800">{{ authStore.userName }}</h3>
                  <p class="text-gray-500 mt-2">{{ authStore.userEmail }}</p>
                </div>

                <!-- 导航菜单 -->
                <nav class="space-y-2">
                  <button
                    @click="activeTab = 'profile'"
                    :class="[
                      'w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center space-x-3',
                      activeTab === 'profile' ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-700'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>{{ t('userCenter.nav.profile') }}</span>
                  </button>
                  <button
                    @click="activeTab = 'orders'"
                    :class="[
                      'w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center space-x-3',
                      activeTab === 'orders' ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-700'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                    <span>{{ t('userCenter.nav.orders') }}</span>
                  </button>
                  <button
                    @click="activeTab = 'quotes'"
                    :class="[
                      'w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center space-x-3',
                      activeTab === 'quotes' ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-700'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    <span>{{ t('userCenter.nav.quotes') }}</span>
                  </button>
                  <button
                    @click="activeTab = 'addresses'"
                    :class="[
                      'w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center space-x-3',
                      activeTab === 'addresses' ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-700'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{{ t('userCenter.nav.addresses') }}</span>
                  </button>
                  <button
                    @click="activeTab = 'settings'"
                    :class="[
                      'w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center space-x-3',
                      activeTab === 'settings' ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-700'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    </svg>
                    <span>{{ t('userCenter.nav.settings') }}</span>
                  </button>
                  <button
                    @click="handleLogout"
                    class="w-full px-4 py-3 text-left rounded-lg transition-colors flex items-center space-x-3 text-red-600 hover:bg-red-50"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5z"/>
                      <path d="M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                    <span>{{ t('userCenter.nav.logout') }}</span>
                  </button>
                </nav>
              </div>
            </div>

            <!-- 主内容区 -->
            <div class="lg:col-span-3">
              <!-- 个人资料 -->
              <div v-if="activeTab === 'profile'" class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('userCenter.profile.title') }}</h2>
                
                <form @submit.prevent="handleProfileUpdate" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.profile.name') }}</label>
                      <input
                        v-model="profileForm.name"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="{{ t('userCenter.profile.namePlaceholder') }}"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.profile.email') }}</label>
                      <input
                        v-model="profileForm.email"
                        type="email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="{{ t('userCenter.profile.emailPlaceholder') }}"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.profile.phone') }}</label>
                      <input
                        v-model="profileForm.phone"
                        type="tel"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="{{ t('userCenter.profile.phonePlaceholder') }}"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.profile.company') }}</label>
                      <input
                        v-model="profileForm.company"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="{{ t('userCenter.profile.companyPlaceholder') }}"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.profile.address') }}</label>
                    <textarea
                      v-model="profileForm.address"
                      rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="{{ t('userCenter.profile.addressPlaceholder') }}"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      :disabled="profileLoading"
                      class="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ profileLoading ? t('userCenter.profile.updating') : t('userCenter.profile.update') }}
                    </button>
                  </div>
                </form>
              </div>

              <!-- 订单管理 -->
              <div v-else-if="activeTab === 'orders'" class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('userCenter.orders.title') }}</h2>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t('userCenter.orders.orderId') }}</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t('userCenter.orders.date') }}</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t('userCenter.orders.status') }}</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t('userCenter.orders.amount') }}</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t('userCenter.orders.action') }}</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="order in orders" :key="order.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ order.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ order.date }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', order.statusClass]">
                            {{ order.status }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ order.amount }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <button class="text-primary hover:text-primary-hover transition-colors mr-3">{{ t('userCenter.orders.view') }}</button>
                          <button class="text-gray-600 hover:text-gray-900 transition-colors">{{ t('userCenter.orders.track') }}</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div v-if="orders.length === 0" class="text-center py-12">
                  <p class="text-gray-500">{{ t('userCenter.orders.empty') }}</p>
                </div>
              </div>

              <!-- 报价管理 -->
              <div v-else-if="activeTab === 'quotes'" class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('userCenter.quotes.title') }}</h2>
                
                <div class="space-y-4">
                  <div v-for="quote in quotes" :key="quote.id" class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ quote.id }}</h3>
                        <p class="text-gray-600 mt-1">{{ t('userCenter.quotes.date') }}: {{ quote.date }}</p>
                      </div>
                      <span :class="['px-2 py-1 text-xs font-semibold rounded-full', quote.statusClass]">
                        {{ quote.status }}
                      </span>
                    </div>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">{{ t('userCenter.quotes.origin') }}</p>
                        <p class="text-gray-800">{{ quote.origin }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">{{ t('userCenter.quotes.destination') }}</p>
                        <p class="text-gray-800">{{ quote.destination }}</p>
                      </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                      <button class="text-primary hover:text-primary-hover transition-colors mr-3">{{ t('userCenter.quotes.view') }}</button>
                      <button class="text-gray-600 hover:text-gray-900 transition-colors">{{ t('userCenter.quotes.contact') }}</button>
                    </div>
                  </div>
                </div>
                
                <div v-if="quotes.length === 0" class="text-center py-12">
                  <p class="text-gray-500">{{ t('userCenter.quotes.empty') }}</p>
                </div>
              </div>

              <!-- 地址管理 -->
              <div v-else-if="activeTab === 'addresses'" class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold text-gray-800">{{ t('userCenter.addresses.title') }}</h2>
                  <button class="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm">
                    {{ t('userCenter.addresses.add') }}
                  </button>
                </div>
                
                <div class="space-y-4">
                  <div v-for="address in addresses" :key="address.id" class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow relative">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ address.name }} {{ address.phone }}</h3>
                        <p class="text-gray-600 mt-1">{{ address.address }}</p>
                      </div>
                      <div class="flex space-x-2">
                        <button class="text-primary hover:text-primary-hover transition-colors">{{ t('userCenter.addresses.edit') }}</button>
                        <button class="text-red-600 hover:text-red-800 transition-colors">{{ t('userCenter.addresses.delete') }}</button>
                      </div>
                    </div>
                    <div v-if="address.isDefault" class="absolute top-3 right-3">
                      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-primary-light text-primary">
                        {{ t('userCenter.addresses.default') }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div v-if="addresses.length === 0" class="text-center py-12">
                  <p class="text-gray-500">{{ t('userCenter.addresses.empty') }}</p>
                </div>
              </div>

              <!-- 账号设置 -->
              <div v-else-if="activeTab === 'settings'" class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('userCenter.settings.title') }}</h2>
                
                <div class="space-y-8">
                  <!-- 密码修改 -->
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ t('userCenter.settings.password') }}</h3>
                    <form @submit.prevent="handlePasswordChange" class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.settings.currentPassword') }}</label>
                        <input
                          v-model="passwordForm.current"
                          type="password"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="{{ t('userCenter.settings.currentPasswordPlaceholder') }}"
                        />
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.settings.newPassword') }}</label>
                          <input
                            v-model="passwordForm.new"
                            type="password"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="{{ t('userCenter.settings.newPasswordPlaceholder') }}"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('userCenter.settings.confirmPassword') }}</label>
                          <input
                            v-model="passwordForm.confirm"
                            type="password"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="{{ t('userCenter.settings.confirmPasswordPlaceholder') }}"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          :disabled="passwordLoading"
                          class="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {{ passwordLoading ? t('userCenter.settings.updating') : t('userCenter.settings.updatePassword') }}
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <!-- 通知设置 -->
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ t('userCenter.settings.notifications') }}</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">{{ t('userCenter.settings.emailNotifications') }}</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer">
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">{{ t('userCenter.settings.smsNotifications') }}</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer">
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">{{ t('userCenter.settings.orderUpdates') }}</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" checked>
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

// 激活的标签
const activeTab = ref('profile')

// 个人资料表单
const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  address: ''
})

const profileLoading = ref(false)

// 密码修改表单
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const passwordLoading = ref(false)

// 模拟订单数据
const orders = ref([
  {
    id: 'ORD20260211001',
    date: '2026-02-11',
    status: '已完成',
    statusClass: 'bg-green-100 text-green-800',
    amount: '¥ 1,200.00'
  },
  {
    id: 'ORD20260210002',
    date: '2026-02-10',
    status: '运输中',
    statusClass: 'bg-blue-100 text-blue-800',
    amount: '¥ 850.00'
  },
  {
    id: 'ORD20260209001',
    date: '2026-02-09',
    status: '待支付',
    statusClass: 'bg-yellow-100 text-yellow-800',
    amount: '¥ 2,100.00'
  }
])

// 模拟报价数据
const quotes = ref([
  {
    id: 'QUOTE20260211001',
    date: '2026-02-11',
    status: '已报价',
    statusClass: 'bg-green-100 text-green-800',
    origin: '北京',
    destination: '上海'
  },
  {
    id: 'QUOTE20260210002',
    date: '2026-02-10',
    status: '处理中',
    statusClass: 'bg-blue-100 text-blue-800',
    origin: '广州',
    destination: '成都'
  }
])

// 模拟地址数据
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    address: '北京市朝阳区建国路88号现代国际大厦',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    address: '上海市浦东新区陆家嘴金融中心',
    isDefault: false
  }
])

// 计算用户名首字母
const userNameInitial = computed(() => {
  const name = authStore.userName
  return name ? name.charAt(0).toUpperCase() : 'U'
})

// 初始化表单数据
onMounted(() => {
  if (authStore.userInfo) {
    profileForm.value = {
      name: authStore.userInfo.name || '',
      email: authStore.userInfo.email || '',
      phone: authStore.userInfo.phone || '',
      company: authStore.userInfo.company || '',
      address: authStore.userInfo.address || ''
    }
  }
})

// 更新个人资料
const handleProfileUpdate = async () => {
  profileLoading.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新用户信息
    const updatedUserInfo = {
      ...authStore.userInfo,
      ...profileForm.value
    }
    
    authStore.login(updatedUserInfo, authStore.token)
    
    alert(t('userCenter.profile.success'))
  } catch (error) {
    alert(t('userCenter.profile.error'))
  } finally {
    profileLoading.value = false
  }
}

// 修改密码
const handlePasswordChange = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert(t('userCenter.settings.passwordMismatch'))
    return
  }
  
  passwordLoading.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert(t('userCenter.settings.passwordSuccess'))
    passwordForm.value = {
      current: '',
      new: '',
      confirm: ''
    }
  } catch (error) {
    alert(t('userCenter.settings.passwordError'))
  } finally {
    passwordLoading.value = false
  }
}

// 退出登录
const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
