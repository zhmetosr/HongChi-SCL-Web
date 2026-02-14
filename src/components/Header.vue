<template>
  <header class="bg-gradient-to-r from-blue-700/30 to-blue-500/30 backdrop-blur-lg shadow-lg border-b border-white/10 sticky top-0 z-50">
    <!-- 顶部滚动通知 -->
    <div class="bg-blue-700 text-white py-1 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="flex items-center animate-marquee">
          <span>尊敬的客户与合作伙伴们：2026年春节期间（2月16日-2月23日），我司物流服务将有所调整，部分线路可能会有延迟，请提前安排发货计划。值此新春佳节之际，祝愿大家阖家幸福安康！万事如意！大吉大利！马到成功！</span>
        </div>
      </div>
    </div>
    
    <!-- 顶部联系电话条 -->
    <div class="bg-blue-600 text-white py-2">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-2xl font-bold" style="word-spacing: 1rem; font-family: 'Arial', 'Microsoft YaHei', sans-serif;">{{ t('header.slogan') }}</p>
          </div>
          <div>
            <div class="flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-lg">{{ t('header.phone') }}</span>
            </div>
            <div class="flex justify-end items-center mt-1 text-lg">
              <a href="#" class="hover:underline mr-4">{{ t('header.sitemap') }}</a>
              <a href="/contact" class="hover:underline">{{ t('header.contactUs') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20 py-3">
        <!-- Logo区域 -->
        <div class="flex items-center space-x-2 transition-transform duration-300 hover:scale-110">
          <img src="/logo.png" :alt="t('header.companyName')" class="w-auto h-10 object-contain" />
          <div class="hidden sm:block">
            <h1 class="text-lg font-bold text-black">{{ t('header.companyName') }}</h1>
            <p class="text-xs text-black">Beijing Hongchi Xiangrui Logistics Co., Ltd.</p>
          </div>
        </div>

        <!-- 桌面导航 -->
        <nav class="hidden lg:flex items-center space-x-3 md:space-x-4 lg:space-x-6 flex-1 justify-center">
          <template v-for="item in navItems" :key="item.name">
            <!-- 服务与解决方案下拉菜单 -->
            <div v-if="item.name === 'services'" class="relative">
              <div class="group">
                <button
                  class="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors font-medium h-16 px-3"
                >
                  {{ t(`nav.${item.name}`) }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-80 bg-white rounded-md shadow-xl border border-gray-200 py-3 z-50 opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-in-out max-h-[70vh] overflow-y-auto">
                    <div class="px-4 py-2 font-medium text-gray-900 border-b border-gray-200">{{ t('dropdown.international') }}</div>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.airFreight') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.seaFreightLcl') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.seaFreightFcl') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.chinaEuropeRailway') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.chinaRussiaTir') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.centralAsiaTir') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.chinaEuropeTir') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.overseasWarehouse') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.multimodal') }}
                    </router-link>
                    
                    <div class="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 mt-2">{{ t('dropdown.domestic') }}</div>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.warehousing') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.logisticsTransport') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.refrigeratedDangerous') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.precisionInstruments') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.oversized') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.multimodal') }}
                    </router-link>
                    
                    <div class="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 mt-2">{{ t('dropdown.valueAdded') }}</div>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.customsClearance') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.loadingPackaging') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.cargoInsurance') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.commodityInspection') }}
                    </router-link>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.consulting') }}
                    </router-link>
                    
                    <div class="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 mt-2">{{ t('dropdown.smartSupplyChain') }}</div>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.smartSupplyChain') }}
                    </router-link>
                    
                    <div class="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 mt-2">{{ t('dropdown.customized') }}</div>
                    <router-link
                      to="/services"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('dropdown.customizedSolution') }}
                    </router-link>
                </div>
              </div>
            </div>
            
            <!-- 普通导航项 -->
            <router-link
              v-else-if="item.name !== 'contact' && item.name !== 'news' && item.name !== 'knowledge' && item.name !== 'support'"
              :to="item.path"
              class="text-gray-800 hover:text-blue-600 transition-colors font-medium flex items-center h-16 px-3"
              active-class="text-blue-600"
              @click="closeAllDropdowns"
            >
              {{ t(`nav.${item.name}`) }}
            </router-link>
            
            <!-- 合作咨询下拉菜单 -->
            <div v-else-if="item.name === 'contact'" class="relative">
              <div class="group">
                <button
                  class="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors font-medium h-16 px-3"
                >
                  {{ t(`nav.${item.name}`) }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-xl border border-gray-200 py-3 z-50 opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-in-out">
                    <router-link
                      to="/contact"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.contactUs') }}
                    </router-link>
                    <router-link
                      to="/quote"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.quote') }}
                    </router-link>
                </div>
              </div>
            </div>
            
            <!-- 新闻资讯下拉菜单 -->
            <div v-else-if="item.name === 'news'" class="relative">
              <div class="group">
                <button
                  class="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors font-medium h-16 px-3"
                >
                  {{ t(`nav.${item.name}`) }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-xl border border-gray-200 py-3 z-50 opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-in-out">
                    <router-link
                      to="/news"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.newsInfo') }}
                    </router-link>
                    <router-link
                      to="/announcements"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.serviceAnnouncements') }}
                    </router-link>
                </div>
              </div>
            </div>
            
            <!-- 服务支持下拉菜单 -->
            <div v-else-if="item.name === 'support'" class="relative">
              <div class="group">
                <button
                  class="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors font-medium h-16 px-3"
                >
                  {{ t(`nav.${item.name}`) }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-xl border border-gray-200 py-3 z-50 opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-in-out">
                    <router-link
                      to="/support/order"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.placeOrder') }}
                    </router-link>
                    <router-link
                      to="/support/track"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.logisticsTracking') }}
                    </router-link>
                    <router-link
                      to="/support/cooperation"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.cooperation') }}
                    </router-link>
                    <router-link
                      to="/support/tech-cooperation"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.techCooperation') }}
                    </router-link>
                    <router-link
                      to="/support/tech-transformation"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:bg-blue-600 transition-colors"
                    >
                      {{ t('dropdown.techTransformation') }}
                    </router-link>
                </div>
              </div>
            </div>
            
            <!-- 知识中心下拉菜单 -->
            <div v-else-if="item.name === 'knowledge'" class="relative">
              <div class="group">
                <button
                  class="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors font-medium h-16 px-3"
                >
                  {{ t(`nav.${item.name}`) }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-xl border border-gray-200 py-3 z-50 opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-in-out">
                    <router-link
                      to="/logistics-knowledge"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.logisticsKnowledge') }}
                    </router-link>
                    <router-link
                      to="/trade-knowledge"
                      class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {{ t('dropdown.tradeKnowledge') }}
                    </router-link>
                </div>
              </div>
            </div>
          </template>
        </nav>

        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-4 md:space-x-6">
          <!-- 语言切换 -->
          <div class="relative">
            <button
              class="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors px-3 py-2"
              @click="showLangDropdown = !showLangDropdown"
            >
              <span>{{ currentLanguageFlag }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="showLangDropdown"
              class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl border border-gray-200 py-3 z-50"
            >
              <button
                v-for="lang in languageStore.supportedLanguages"
                :key="lang.code"
                @click="() => {
                  languageStore.setLanguage(lang.code);
                  showLangDropdown = false;
                  // 切换到英语时，跳转到国际站首页
                  if (lang.code === 'en') {
                    window.location.href = '/';
                  }
                }"
                class="w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center space-x-2"
                :class="{ 'text-blue-600': languageStore.currentLanguage === lang.code }"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>

          <!-- 登录注册 -->
          <div class="hidden sm:flex items-center space-x-4">
            <router-link
              v-if="!authStore.isLoggedIn"
              to="/login"
              class="px-4 py-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              {{ t('nav.login') }}
            </router-link>
            <router-link
              v-if="!authStore.isLoggedIn"
              to="/register"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {{ t('nav.register') }}
            </router-link>
            <div v-else class="flex items-center space-x-4">
              <router-link
                to="/user"
                class="text-gray-800 hover:text-blue-600 transition-colors"
              >
                {{ authStore.userName }}
              </router-link>
              <router-link
                to="/user"
                class="px-4 py-2 text-gray-800 hover:text-blue-600 transition-colors"
              >
                用户中心
              </router-link>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-gray-800 hover:text-blue-600 transition-colors"
              >
                退出
              </button>
            </div>
          </div>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-3 text-gray-800 hover:text-blue-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端导航 -->
      <div v-if="showMobileMenu" class="lg:hidden py-4 border-t border-gray-200">
        <nav class="flex flex-col space-y-3">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="text-black hover:text-gray-700 transition-colors font-medium py-2"
            active-class="text-gray-700"
            @click="showMobileMenu = false"
          >
            {{ t(`nav.${item.name}`) }}
          </router-link>
          <div class="flex flex-col space-y-2 pt-2 border-t border-gray-200">
            <router-link
              v-if="!authStore.isLoggedIn"
              to="/login"
              class="text-black hover:text-gray-700 transition-colors py-2"
              @click="showMobileMenu = false"
            >
              {{ t('nav.login') }}
            </router-link>
            <router-link
              v-if="!authStore.isLoggedIn"
              to="/register"
              class="text-black py-2"
              @click="showMobileMenu = false"
            >
              {{ t('nav.register') }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const languageStore = useLanguageStore()
const authStore = useAuthStore()

const showLangDropdown = ref(false)
const showContactDropdown = ref(false)
const showNewsDropdown = ref(false)
const showKnowledgeDropdown = ref(false)
const showMobileMenu = ref(false)
const langDropdown = ref(null)

const navItems = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'support', path: '/support' },
  { name: 'news', path: '/news' },
  { name: 'knowledge', path: '/knowledge' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' }
]

const currentLanguageFlag = computed(() => languageStore.getCurrentLanguageFlag)

const toggleLangDropdown = (event) => {
  // 阻止事件冒泡，避免触发 handleClickOutside
  if (event) {
    event.stopPropagation()
  }
  showLangDropdown.value = !showLangDropdown.value
  showContactDropdown.value = false
  showNewsDropdown.value = false
  showKnowledgeDropdown.value = false
}

const toggleContactDropdown = () => {
  showContactDropdown.value = !showContactDropdown.value
  showLangDropdown.value = false
  showNewsDropdown.value = false
  showKnowledgeDropdown.value = false
}

const toggleNewsDropdown = () => {
  showNewsDropdown.value = !showNewsDropdown.value
  showLangDropdown.value = false
  showContactDropdown.value = false
  showKnowledgeDropdown.value = false
}

const toggleKnowledgeDropdown = () => {
  showKnowledgeDropdown.value = !showKnowledgeDropdown.value
  showLangDropdown.value = false
  showContactDropdown.value = false
  showNewsDropdown.value = false
}

const changeLanguage = (langCode) => {
  languageStore.setLanguage(langCode)
  showLangDropdown.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  showContactDropdown.value = false
  showLangDropdown.value = false
  showNewsDropdown.value = false
  showKnowledgeDropdown.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

// 关闭所有下拉菜单
const closeAllDropdowns = () => {
  showLangDropdown.value = false
  showContactDropdown.value = false
  showNewsDropdown.value = false
  showKnowledgeDropdown.value = false
  showMobileMenu.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  // 检查语言下拉菜单
  if (langDropdown.value && event.target && !langDropdown.value.contains(event.target)) {
    showLangDropdown.value = false
  }
  
  // 对于其他下拉菜单，直接关闭
  // 因为它们主要通过鼠标悬停和点击事件控制
  showContactDropdown.value = false
  showNewsDropdown.value = false
  showKnowledgeDropdown.value = false
}

onMounted(() => {
  languageStore.initLanguage()
  authStore.initAuth()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.animate-marquee {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
