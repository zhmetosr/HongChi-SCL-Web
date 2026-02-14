<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ t('news.title') }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('news.subtitle') }}</p>
      </div>
    </section>

    <!-- 新闻列表 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- 新闻列表 -->
          <div class="space-y-8">
            <div v-for="news in newsList" :key="news.id" class="border border-gray-100 rounded-lg hover:shadow-card-hover transition-shadow overflow-hidden">
              <div class="md:flex">
                <div class="md:w-1/3 bg-primary-light h-48 md:h-auto flex items-center justify-center">
                  <span class="text-4xl">{{ news.icon }}</span>
                </div>
                <div class="p-6 md:w-2/3">
                  <div class="flex items-center text-sm text-gray-500 mb-2">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                    </svg>
                    {{ news.date }}
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ news.title }}</h3>
                  <p class="text-gray-600 mb-4 line-clamp-2">{{ news.summary }}</p>
                  <router-link :to="`/news/${news.id}`" class="text-primary hover:text-primary-hover transition-colors font-medium flex items-center">
                    {{ t('news.readMore') }} 
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </router-link>
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 模拟新闻数据
const newsList = ref([
  {
    id: 1,
    icon: '🌍',
    title: '鸿驰祥瑞物流荣获2026年度最佳物流服务企业奖',
    summary: '近日，鸿驰祥瑞物流凭借卓越的服务质量和创新的物流解决方案，荣获2026年度最佳物流服务企业奖。这一殊荣是对我们多年来致力于提供优质物流服务的肯定。',
    date: '2026-02-10'
  },
  {
    id: 2,
    icon: '🚢',
    title: '新航线开通：北京-汉堡直达海运航线正式运营',
    summary: '为了更好地服务中欧贸易，鸿驰祥瑞物流正式开通北京-汉堡直达海运航线，大大缩短了货物运输时间，提高了物流效率。',
    date: '2026-02-05'
  },
  {
    id: 3,
    icon: '✈️',
    title: '空运服务全面升级，推出限时达服务',
    summary: '针对时效性要求高的客户，我们推出了空运限时达服务，承诺48小时内将货物送达全球主要城市。',
    date: '2026-01-28'
  },
  {
    id: 4,
    icon: '📦',
    title: '智能仓储系统投入使用，提升仓储效率30%',
    summary: '鸿驰祥瑞物流引入最新智能仓储系统，实现了仓储管理的自动化和智能化，仓储效率提升30%，错误率降低至0.1%以下。',
    date: '2026-01-20'
  },
  {
    id: 5,
    icon: '🌐',
    title: '全球物流网络进一步扩展，新增10个海外网点',
    summary: '为了更好地服务全球客户，鸿驰祥瑞物流在2026年第一季度新增10个海外网点，覆盖欧洲、美洲和东南亚地区。',
    date: '2026-01-15'
  }
])
</script>
