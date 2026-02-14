<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ t('nav.support') }}</h1>
        <p class="text-gray-600 max-w-3xl">{{ t('home.coreServicesDesc') }}</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- 快速联系方式 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-lg p-6 text-center hover:shadow-card-hover transition-shadow">
          <div class="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">电话咨询</h3>
          <p class="text-2xl font-bold text-primary mb-2">+86 139 1118 2428</p>
          <p class="text-gray-600 text-sm">周一至周日 8:00-20:00</p>
        </div>

        <div class="bg-white rounded-lg p-6 text-center hover:shadow-card-hover transition-shadow">
          <div class="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">在线咨询</h3>
          <p class="text-gray-600 mb-2">微信：13911182428</p>
          <p class="text-gray-600 text-sm">即时响应，快速解答</p>
        </div>

        <div class="bg-white rounded-lg p-6 text-center hover:shadow-card-hover transition-shadow">
          <div class="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">邮件咨询</h3>
          <p class="text-gray-600 mb-2">zhangxiang@hongchixiangrui.com</p>
          <p class="text-gray-600 text-sm">24小时内回复</p>
        </div>
      </div>

      <!-- 常见问题 -->
      <div class="max-w-4xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">常见问题</h2>
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-lg">
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center"
            >
              <span class="text-lg font-medium text-gray-800">{{ faq.question }}</span>
              <svg
                :class="{ 'rotate-180': faq.isOpen }"
                class="w-5 h-5 text-gray-500 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="faq.isOpen" class="px-6 pb-4 text-gray-600">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- 服务承诺 -->
      <div class="bg-white rounded-lg p-8 mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">服务承诺</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(item, index) in promises" :key="index" class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 服务时间 -->
      <div class="bg-primary rounded-lg p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-4">服务时间</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
            <h3 class="text-lg font-semibold mb-2">工作时间</h3>
            <p class="text-white/80">周一至周五：8:00 - 18:00</p>
            <p class="text-white/80">周六至周日：9:00 - 17:00</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">紧急响应</h3>
            <p class="text-white/80">7×24小时紧急服务热线</p>
            <p class="text-2xl font-bold mt-2">+86 139 1118 2428</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const faqs = ref([
  {
    question: '如何获取物流报价？',
    answer: '您可以通过我们的在线报价系统提交货物信息，我们的专业团队将在2小时内为您提供详细的报价方案。紧急情况下，可以直接拨打客服电话获取即时报价。',
    isOpen: true
  },
  {
    question: '国际运输需要多长时间？',
    answer: '国际空运通常需要3-7个工作日，海运整柜约15-30天，海运拼箱约20-35天，中欧班列约15-20天。具体时效会根据起运地、目的地、航线等因素有所变化。',
    isOpen: false
  },
  {
    question: '如何查询货物状态？',
    answer: '我们会为您提供运单号，您可以通过我们的官方网站、微信公众号或致电客服进行实时查询。同时，我们的客服团队也会定期向您反馈货物运输状态。',
    isOpen: false
  },
  {
    question: '货物损坏或丢失怎么办？',
    answer: '我们为所有货物提供全面的保险服务。如果在运输过程中出现货物损坏或丢失，请立即联系我们的客服团队，我们将协助您进行保险理赔，最大程度减少您的损失。',
    isOpen: false
  },
  {
    question: '支持哪些支付方式？',
    answer: '我们支持银行转账、支付宝、微信支付、信用卡等多种支付方式。对于长期合作客户，我们还可以提供月结等灵活的支付方案。',
    isOpen: false
  },
  {
    question: '如何处理报关清关问题？',
    answer: '我们拥有专业的报关团队，可以协助您完成所有的报关清关手续。您只需要提供必要的单证资料，我们将确保货物顺利通关，避免产生额外的滞港费用。',
    isOpen: false
  }
])

const promises = [
  {
    icon: '✅',
    title: '准时送达',
    desc: '承诺按时送达，延误必赔'
  },
  {
    icon: '🛡️',
    title: '安全保障',
    desc: '全程保险，货物安全无忧'
  },
  {
    icon: '💯',
    title: '价格透明',
    desc: '无隐藏费用，明码标价'
  },
  {
    icon: '🎯',
    title: '专业服务',
    desc: '专业团队，全程跟踪服务'
  }
]

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>
