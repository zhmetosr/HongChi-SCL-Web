<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ t('nav.services') }}</h1>
        <p class="text-gray-600 max-w-3xl">{{ t('home.coreServicesDesc') }}</p>
      </div>
    </div>

    <!-- 服务分类 -->
    <div class="container mx-auto px-4 py-12">
      <!-- Tab导航 -->
      <div class="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-colors',
            activeTab === tab.key
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-primary-light'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 服务列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(service, index) in currentServices"
          :key="index"
          class="bg-white rounded-lg p-6 hover:shadow-card-hover transition-shadow"
        >
          <div class="w-14 h-14 bg-primary-light rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">{{ service.icon }}</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ service.title }}</h3>
          <p class="text-gray-600 mb-4">{{ service.desc }}</p>
          <ul v-if="service.features" class="space-y-2 mb-4">
            <li v-for="(feature, idx) in service.features" :key="idx" class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ feature }}
            </li>
          </ul>
          <router-link to="/services" class="text-primary font-medium hover:text-primary-hover transition-colors">
              {{ t('home.learnMore') }} →
            </router-link>
        </div>
      </div>

      <!-- 解决方案亮点 -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">客制化解决方案</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg p-8">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">跨境电商物流</h3>
            <p class="text-gray-600 mb-6">为跨境电商卖家提供专业的国际物流解决方案，包括头程运输、海外仓、尾程配送等全链路服务。</p>
            <ul class="space-y-3">
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                一站式跨境物流服务
              </li>
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                海外仓储配送一体化
              </li>
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                实时库存管理系统
              </li>
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                多平台订单同步处理
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-lg p-8">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">工程项目物流</h3>
            <p class="text-gray-600 mb-6">为大型工程项目提供专业的物流解决方案，包括设备运输、现场管理、安装调试等配套服务。</p>
            <ul class="space-y-3">
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                超大件设备专业运输
              </li>
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                全程跟踪监控系统
              </li>
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                专业包装加固方案
              </li>
              <li class="flex items-center text-gray-700">
                <span class="w-2 h-2 bg-primary rounded-full mr-3"></span>
                现场安装调试支持
              </li>
            </ul>
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
const activeTab = ref('international')

const tabs = [
  { key: 'international', label: t('dropdown.international') },
  { key: 'domestic', label: t('dropdown.domestic') },
  { key: 'valueAdded', label: t('dropdown.valueAdded') },
  { key: 'supplyChain', label: t('dropdown.smartSupplyChain') },
  { key: 'customized', label: t('dropdown.customized') }
]

const serviceData = {
  international: [
    {
      icon: '✈️',
      title: t('dropdown.airFreight'),
      desc: '覆盖全球主要机场的快捷航空运输服务',
      features: ['时效优先', '航班选择丰富', '门到门服务', '全程跟踪']
    },
    {
      icon: '🚢',
      title: t('dropdown.seaFreightLcl'),
      desc: '灵活适配不同货量的海运拼箱解决方案',
      features: ['经济实惠', '航线覆盖广', '拼箱灵活', '全程跟踪']
    },
    {
      icon: '🚢',
      title: t('dropdown.seaFreightFcl'),
      desc: '针对大批量货物的海运整柜服务',
      features: ['成本优势', '装载量大', '安全性高', '专业操作']
    },
    {
      icon: '🚂',
      title: t('dropdown.chinaEuropeRailway'),
      desc: '亚欧大陆桥跨境铁路运输服务',
      features: ['稳定可靠', '时效介于空海之间', '成本适中', '环保低碳']
    },
    {
      icon: '🚛',
      title: t('dropdown.chinaRussiaTir'),
      desc: '中俄边境TIR认证跨境公路运输服务',
      features: ['门到门服务', 'TIR认证', '通关便捷', '全程可视']
    },
    {
      icon: '🚛',
      title: t('dropdown.centralAsiaTir'),
      desc: '中国至中亚五国的TIR认证跨境公路运输',
      features: ['跨境直达', 'TIR认证', '快速通关', '专业团队']
    },
    {
      icon: '🚛',
      title: t('dropdown.chinaEuropeTir'),
      desc: '中国至欧洲的TIR认证跨境公路运输服务',
      features: ['门到门服务', 'TIR认证', '通关便捷', '全程跟踪']
    },
    {
      icon: '📦',
      title: t('dropdown.overseasWarehouse'),
      desc: '全球仓储配送一体化服务',
      features: ['全球布点', '本地配送', '库存管理', '退换货处理']
    },
    {
      icon: '🔄',
      title: t('dropdown.multimodal'),
      desc: '空海/海陆联运优化方案',
      features: ['灵活组合', '成本优化', '时效平衡', '一站式服务']
    }
  ],
  domestic: [
    {
      icon: '📦',
      title: t('dropdown.warehousing'),
      desc: '中国国内(含港澳台)专业仓储服务',
      features: ['专业仓储', '库存管理', '订单处理', '增值服务']
    },
    {
      icon: '🚚',
      title: t('dropdown.logisticsTransport'),
      desc: '覆盖全国的公路运输网络，提供零担拼车和整车运输服务',
      features: ['时效稳定', '价格透明', '全程跟踪', '上门提货']
    },
    {
      icon: '❄️',
      title: t('dropdown.refrigeratedDangerous'),
      desc: '专业的冷藏和危险品运输服务',
      features: ['温控保障', '合规操作', '安全运输', '专业团队']
    },
    {
      icon: '🔬',
      title: t('dropdown.precisionInstruments'),
      desc: '针对精密仪器的恒温气垫车专业运输',
      features: ['恒温控制', '减震气垫', '安全保障', '专业操作']
    },
    {
      icon: '📦',
      title: t('dropdown.oversized'),
      desc: '针对超大、超重货物的专业运输服务',
      features: ['专业设备', '路线规划', '安全保障', '全程监控']
    },
    {
      icon: '🔄',
      title: t('dropdown.multimodal'),
      desc: '国内多式联运优化方案',
      features: ['灵活组合', '成本优化', '时效平衡', '一站式服务']
    }
  ],
  valueAdded: [
    {
      icon: '📋',
      title: t('dropdown.customsClearance'),
      desc: '专业的进出口报关、清关和转关服务',
      features: ['专业团队', '快速通关', '减少滞港', '降低风险']
    },
    {
      icon: '📦',
      title: t('dropdown.loadingPackaging'),
      desc: '专业的货物装卸、包装操作和包材供应服务',
      features: ['专业操作', '定制包装', '安全保障', '材料供应']
    },
    {
      icon: '🛡️',
      title: t('dropdown.cargoInsurance'),
      desc: '全面的货物运输保险和签回单服务',
      features: ['保险方案', '快速理赔', '风险转移', '单证服务']
    },
    {
      icon: '📋',
      title: t('dropdown.commodityInspection'),
      desc: '专业的商检和产地证办理服务',
      features: ['专业办理', '快速出证', '合规保障', '全程服务']
    },
    {
      icon: '💡',
      title: t('dropdown.consulting'),
      desc: '专业的物流信息、技术和供应链咨询服务',
      features: ['专业顾问', '定制方案', '优化流程', '提升效率']
    }
  ],
  supplyChain: [
    {
      icon: '🔗',
      title: t('dropdown.smartSupplyChain'),
      desc: '融合智能科技的供应链综合解决方案',
      features: ['智能供应链', '科技赋能', '数据驱动', '全链路优化']
    }
  ],
  customized: [
    {
      icon: '🎯',
      title: t('dropdown.customizedSolution'),
      desc: '根据客户需求定制的一站式物流供应链解决方案',
      features: ['定制化服务', '全链路覆盖', '成本优化', '专业团队']
    }
  ]
}

const currentServices = computed(() => {
  return serviceData[activeTab.value] || []
})
</script>
