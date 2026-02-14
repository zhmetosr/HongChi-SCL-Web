<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ news?.title || '新闻详情' }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('news.subtitle') }}</p>
      </div>
    </section>

    <!-- 新闻详情 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <!-- 新闻头部信息 -->
          <div class="flex items-center text-sm text-gray-500 mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
            {{ news?.date }}
          </div>

          <!-- 新闻标题 -->
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ news?.title }}</h2>

          <!-- 新闻内容 -->
          <div class="prose prose-lg max-w-none text-gray-600">
            <p class="mb-4">{{ news?.content || '暂无内容' }}</p>
          </div>

          <!-- 返回按钮 -->
          <div class="mt-12">
            <router-link 
              to="/news" 
              class="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              返回新闻列表
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const news = ref(null)

// 模拟新闻详情数据
const newsData = [
  {
    id: 1,
    title: '鸿驰祥瑞物流荣获2026年度最佳物流服务企业奖',
    date: '2026-02-10',
    content: '近日，鸿驰祥瑞物流凭借卓越的服务质量和创新的物流解决方案，荣获2026年度最佳物流服务企业奖。这一殊荣是对我们多年来致力于提供优质物流服务的肯定。\n\n作为一家专注于国际物流的企业，我们始终坚持以客户为中心，不断优化服务流程，提升服务质量。此次获奖，不仅是对我们过去工作的认可，更是对我们未来发展的激励。\n\n在未来的发展中，我们将继续秉承"诚信、专业、创新、高效"的服务理念，为客户提供更加优质、便捷的物流服务，助力企业实现全球化发展。'
  },
  {
    id: 2,
    title: '新航线开通：北京-汉堡直达海运航线正式运营',
    date: '2026-02-05',
    content: '为了更好地服务中欧贸易，鸿驰祥瑞物流正式开通北京-汉堡直达海运航线，大大缩短了货物运输时间，提高了物流效率。\n\n新航线的开通，将为中欧贸易提供更加便捷、高效的物流通道，有助于降低企业物流成本，提升供应链效率。同时，也将进一步促进中欧经贸合作，为两国企业创造更多商机。\n\n我们将配备专业的运营团队，确保航线的稳定运行，为客户提供全程跟踪服务，让您的货物运输更加安全、可靠。'
  },
  {
    id: 3,
    title: '空运服务全面升级，推出限时达服务',
    date: '2026-01-28',
    content: '针对时效性要求高的客户，我们推出了空运限时达服务，承诺48小时内将货物送达全球主要城市。\n\n这项服务的推出，是我们对空运服务的全面升级，旨在为客户提供更加快速、可靠的物流解决方案。我们与多家国际航空公司建立了深度合作关系，确保舱位充足，能够满足客户的紧急运输需求。\n\n同时，我们还提供全程温控、保险等增值服务，为客户的贵重物品提供全方位保障。无论是样品、文件还是紧急货物，我们都能为您提供最优质的空运服务。'
  },
  {
    id: 4,
    title: '智能仓储系统投入使用，提升仓储效率30%',
    date: '2026-01-20',
    content: '鸿驰祥瑞物流引入最新智能仓储系统，实现了仓储管理的自动化和智能化，仓储效率提升30%，错误率降低至0.1%以下。\n\n新系统采用了先进的物联网技术和人工智能算法，能够实现货物的自动识别、分类、存储和拣选，大大提高了仓储操作的效率和准确性。同时，系统还具备实时监控和预警功能，能够及时发现和处理仓储过程中的异常情况。\n\n智能仓储系统的投入使用，不仅提升了我们的仓储能力，也为客户提供了更加透明、高效的仓储服务。客户可以通过我们的在线平台，实时查看货物的存储状态和位置，随时掌握库存信息。'
  },
  {
    id: 5,
    title: '全球物流网络进一步扩展，新增10个海外网点',
    date: '2026-01-15',
    content: '为了更好地服务全球客户，鸿驰祥瑞物流在2026年第一季度新增10个海外网点，覆盖欧洲、美洲和东南亚地区。\n\n这些新网点的设立，将进一步完善我们的全球物流网络，缩短货物的运输时间，提高物流服务的响应速度。同时，也将为客户提供更加本地化的服务，满足不同地区客户的特殊需求。\n\n我们的海外网点均配备了专业的物流团队和先进的物流设备，能够为客户提供包括清关、仓储、配送等在内的一站式物流服务。无论您的货物需要运往哪个国家或地区，我们都能为您提供最优质的物流解决方案。'
  }
]

onMounted(() => {
  const id = parseInt(route.params.id)
  news.value = newsData.find(item => item.id === id)
  
  // 如果找不到对应的新闻，返回新闻列表页
  if (!news.value) {
    router.push('/news')
  }
})
</script>