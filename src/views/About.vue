<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero区域 -->
    <div class="bg-gradient-to-br from-primary to-primary-hover text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('about.companyIntro') }}</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">{{ t('about.companyDesc1') }}</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- 公司简介 -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="bg-white rounded-lg p-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">{{ t('about.companyIntro') }}</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            {{ t('about.companyDesc1') }}
          </p>
          <p class="text-gray-600 leading-relaxed mb-4">
            {{ t('about.companyDesc2') }}
          </p>
          <p class="text-gray-600 leading-relaxed">
            {{ t('about.companyDesc3') }}
          </p>
        </div>
      </div>

      <!-- 企业文化 -->
      <div class="max-w-6xl mx-auto mb-20">
        <h2 class="text-3xl font-bold text-gray-800 mb-16 text-center">{{ t('about.companyCulture') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 企业愿景 -->
          <div class="relative bg-white rounded-xl p-8 text-center overflow-hidden group hover:shadow-xl transition-all duration-300">
            <!-- 渐变背景 -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-hover"></div>
            
            <!-- 装饰元素 -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-light/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <!-- 图标 -->
            <div class="relative z-10 w-20 h-20 bg-gradient-to-br from-primary-light to-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">🎯</span>
            </div>
            
            <!-- 内容 -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">{{ t('about.vision') }}</h3>
              <p class="text-gray-600 leading-relaxed line-height-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {{ t('about.visionDesc') }}
              </p>
            </div>
          </div>
          
          <!-- 经营理念 -->
          <div class="relative bg-white rounded-xl p-8 text-center overflow-hidden group hover:shadow-xl transition-all duration-300">
            <!-- 渐变背景 -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-hover"></div>
            
            <!-- 装饰元素 -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-light/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <!-- 图标 -->
            <div class="relative z-10 w-20 h-20 bg-gradient-to-br from-primary-light to-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">💼</span>
            </div>
            
            <!-- 内容 -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">{{ t('about.philosophy') }}</h3>
              <p class="text-gray-600 leading-relaxed line-height-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {{ t('about.philosophyDesc') }}
              </p>
            </div>
          </div>
          
          <!-- 企业使命 -->
          <div class="relative bg-white rounded-xl p-8 text-center overflow-hidden group hover:shadow-xl transition-all duration-300">
            <!-- 渐变背景 -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-hover"></div>
            
            <!-- 装饰元素 -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-light/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <!-- 图标 -->
            <div class="relative z-10 w-20 h-20 bg-gradient-to-br from-primary-light to-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">⭐</span>
            </div>
            
            <!-- 内容 -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">{{ t('about.mission') }}</h3>
              <p class="text-gray-600 leading-relaxed line-height-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {{ t('about.missionDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 发展历程 -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center">{{ t('about.developmentHistory') }}</h2>
        
        <!-- 横版时间线 -->
        <div class="relative">

          
          <!-- 里程碑列表 -->
          <div class="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div 
              v-for="(item, index) in history" 
              :key="index" 
              :class="[
                'relative flex flex-col items-center w-full md:w-1/8 opacity-0 transform transition-all duration-700 ease-out',
                item.year === '2025' ? 'md:-translate-y-12' : 'translate-y-10'
              ]"
              :style="{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'forwards'
              }"
              ref="milestoneRefs"
            >
              <!-- 年份标记 -->
              <div :class="[
                'flex items-center justify-center rounded-full text-white font-bold border-4 border-white z-10 mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg',
                item.year === '2025' 
                  ? 'w-20 h-20 bg-primary-hover text-lg shadow-lg' 
                  : 'w-16 h-16 bg-primary text-lg shadow-md'
              ]">
                {{ item.year }}
              </div>
              
              <!-- 连接线 (仅在桌面端显示) -->
              <div v-if="index < history.length - 1" class="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-0"></div>
              
              <!-- 内容 -->
              <div :class="[
                'text-center px-2 transition-all duration-300 hover:scale-105 hover:text-primary',
                item.year === '2025' ? 'md:mt-2' : ''
              ]">
                <h3 :class="[
                  'font-semibold mb-2 transition-colors duration-300',
                  item.year === '2025' ? 'text-xl text-primary' : 'text-lg text-gray-800'
                ]">{{ t(`about.history${item.year}`) }}</h3>
                <p :class="[
                  'transition-colors duration-300',
                  item.year === '2025' ? 'text-gray-700' : 'text-gray-600 text-sm'
                ]">{{ t(`about.history${item.year}Desc`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 团队介绍 -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">{{ t('about.teamIntroduction') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div v-for="(member, index) in team" :key="index" class="bg-white rounded-lg p-6 text-center hover:shadow-card-hover transition-shadow">
            <div class="w-24 h-24 mx-auto mb-4">
              <img 
                v-if="member.avatar" 
                :src="member.avatar" 
                :alt="member.name"
                class="w-full h-full object-cover rounded-full"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center">
                <span class="text-4xl text-white font-bold">{{ member.name.charAt(0) }}</span>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ member.name }}</h3>
            <p class="text-primary font-medium mb-2">{{ member.position }}</p>
            <p class="text-gray-600">{{ member.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 资质荣誉 -->
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">{{ t('about.teamIntroduction') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(certificate, index) in certificates" :key="index" class="bg-white rounded-lg p-4 text-center hover:shadow-card-hover transition-shadow">
            <img 
              :src="certificate.image" 
              :alt="certificate.name"
              class="w-full h-48 object-contain mx-auto mb-4"
            />
            <h3 class="text-sm font-semibold text-gray-800">{{ certificate.name }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-primary text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('about.teamIntroduction') }}</h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">{{ t('about.teamDesc') }}</p>
        <router-link to="/contact" class="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
          {{ t('header.contactUs') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const milestoneRefs = ref([])

const history = [
  {
    year: '2024',
    title: '公司成立',
    desc: '北京鸿驰祥瑞物流有限公司在北京正式成立，开启物流服务之旅'
  },
  {
    year: '2025',
    title: '业务拓展',
    desc: '拓展国际空运和海运业务，在主要国际物流枢纽建立合作伙伴关系'
  },
  {
    year: '2026',
    title: '全面发展',
    desc: '上线数字化系统，建立海外仓储中心，推出定制化物流解决方案'
  }
]

const team = [
  {
    name: '张翔',
    position: '创始人',
    desc: '深耕物流行业多年，拥有丰富的行业经验和资源，致力于打造高效可靠的物流服务体系',
    avatar: '/图片7.png'
  },
  {
    name: '周孟桐',
    position: '技术总监',
    desc: '技术专家，专注于物流行业数字化转型，打造智能化物流管理系统',
    avatar: '/jishun.png'
  }
]

const certificates = [
  { name: 'AAA信用企业', image: '/证书/AAA信用企业_motucloud_202602111819.png' },
  { name: '中国诚信企业家AAA', image: '/证书/中国诚信企业家AAA_motucloud_202602111819.png' },
  { name: '中国诚信经理人AAA', image: '/证书/中国诚信经理人AAA_motucloud_202602111819.png' },
  { name: '企业信用等级证书AAA', image: '/证书/企业信用等级证书AAA_motucloud_202602111819.png' },
  { name: '企业资信等级证书AAA', image: '/证书/企业资信等级证书AAA_motucloud_202602111819.png' },
  { name: '行业平台证书-JCtrans', image: '/证书/行业平台证书-JCtrans_motucloud_202602111819.png' },
  { name: '行业平台证书-WLA', image: '/证书/行业平台证书-WLA_motucloud_202602111819.png' },
  { name: '行政资质-NVOCC', image: '/证书/行政资质-NVOCC-无船承运人准予备案通知书_motucloud_202602111819.png' },
  { name: '行政资质-营业执照', image: '/证书/行政资质-营业执照_motucloud_202602111819.png' },
  { name: '行政资质-道路运输许可证', image: '/证书/行政资质-道路运输许可证_motucloud_202602111819.jpg' },
  { name: '诚信供应商企业AAA', image: '/证书/诚信供应商企业AAA_motucloud_202602111819.png' },
  { name: '诚信经营示范单位AAA', image: '/证书/诚信经营示范单位AAA_motucloud_202602111819.png' },
  { name: '质量服务诚信单位AAA', image: '/证书/质量服务诚信单位AAA_motucloud_202602111819.png' },
  { name: '道路运输经营许可证', image: '/证书/道路运输经营许可证_motucloud_202602111819.png' },
  { name: '重合同守信用企业AAA', image: '/证书/重合同守信用企业AAA_motucloud_202602111819.png' },
  { name: '重服务守信用企业AAA', image: '/证书/重服务守信用企业AAA_motucloud_202602111819.png' },
  { name: '重质量守信用企业AAA', image: '/证书/重质量守信用企业AAA_motucloud_202602111819.png' }
]

// 滚动检测逻辑
const observer = ref(null)

onMounted(() => {
  // 创建Intersection Observer
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 元素进入视口，触发动画
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        entry.target.style.transitionDelay = `${index * 0.2}s`
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // 观察所有里程碑元素
  setTimeout(() => {
    milestoneRefs.value.forEach((el) => {
      if (el) {
        observer.value.observe(el)
      }
    })
  }, 100)
})

onUnmounted(() => {
  // 清理observer
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>
