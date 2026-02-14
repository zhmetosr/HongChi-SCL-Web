<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ t('tradeKnowledge.title') }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('tradeKnowledge.subtitle') }}</p>
      </div>
    </section>

    <!-- 知识内容 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- 知识文章 -->
          <div class="space-y-12">
            <div v-for="article in articles" :key="article.id" class="border-b border-gray-100 pb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ article.title }}</h2>
              <div class="flex items-center text-sm text-gray-500 mb-6">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                </svg>
                {{ article.date }}
                <span class="mx-2">•</span>
                <span>{{ article.category }}</span>
              </div>
              <div class="prose max-w-none text-gray-600">
                <p>{{ article.content }}</p>
                <div v-if="article.tips" class="bg-primary-light/50 p-4 rounded-lg mt-4">
                  <h4 class="font-semibold text-primary mb-2">{{ t('tradeKnowledge.tips') }}</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li v-for="(tip, index) in article.tips" :key="index">{{ tip }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="articles.length === 0" class="text-center py-16">
            <p class="text-gray-500">{{ t('tradeKnowledge.empty') }}</p>
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

// 文章数据
const articles = ref([
  {
    id: 1,
    title: '国际贸易术语Incoterms 2020详解',
    date: '2026-01-30',
    category: '贸易术语',
    content: 'Incoterms 2020是国际商会制定的国际贸易术语解释通则，定义了买卖双方在货物交付过程中的责任、费用和风险划分。本文详细介绍了11个贸易术语的含义、适用场景以及买卖双方的责任划分。',
    tips: [
      '选择合适的贸易术语对控制成本和风险至关重要',
      '不同贸易术语下的保险责任和费用承担方式不同',
      '建议根据货物特性、运输方式和交易习惯选择合适的术语'
    ]
  },
  {
    id: 2,
    title: '如何有效规避国际贸易风险',
    date: '2026-01-20',
    category: '风险规避',
    content: '国际贸易涉及多个环节和不同国家的法律法规，存在多种风险。本文从合同签订、支付方式、货物运输、保险投保等方面，详细介绍如何有效规避国际贸易风险。',
    tips: [
      '选择安全的支付方式，如信用证、托收等',
      '合理投保货物运输保险',
      '了解目的国的法律法规和贸易壁垒',
      '建立完善的合同条款，明确双方责任'
    ]
  },
  {
    id: 3,
    title: '跨境电商出口退税政策解析',
    date: '2026-01-15',
    category: '政策解读',
    content: '跨境电商出口退税是国家鼓励外贸发展的重要政策。本文详细介绍了跨境电商出口退税的条件、申报流程、所需资料以及注意事项，帮助企业充分享受政策红利。',
    tips: [
      '确保交易真实有效，符合退税条件',
      '及时收集和整理退税所需资料',
      '了解不同产品的退税率',
      '注意退税申报的时间限制'
    ]
  },
  {
    id: 4,
    title: '国际市场调研方法与技巧',
    date: '2026-01-10',
    category: '市场调研',
    content: '在进入国际市场之前，充分的市场调研是成功的关键。本文介绍了国际市场调研的主要方法、调研内容、数据收集渠道以及分析技巧，帮助企业做出科学的市场决策。',
    tips: [
      '结合定量和定性调研方法',
      '利用当地合作伙伴的资源和信息',
      '关注目标市场的文化、消费习惯和法律法规',
      '定期更新市场调研数据，适应市场变化'
    ]
  }
])
</script>
