<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ t('logisticsKnowledge.title') }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('logisticsKnowledge.subtitle') }}</p>
      </div>
    </section>

    <!-- 知识分类 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- 分类标签 -->
          <div class="flex flex-wrap justify-center gap-3 mb-12">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-primary-light'
              ]"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- 知识列表 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="article in filteredArticles" :key="article.id" class="border border-gray-100 rounded-lg hover:shadow-card-hover transition-shadow overflow-hidden">
              <div class="bg-primary-light h-32 flex items-center justify-center">
                <span class="text-3xl">{{ article.icon }}</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ article.title }}</h3>
                <p class="text-gray-600 mb-4 line-clamp-2">{{ article.summary }}</p>
                <a href="#" class="text-primary hover:text-primary-hover transition-colors font-medium text-sm">
                  {{ t('logisticsKnowledge.readMore') }}
                </a>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredArticles.length === 0" class="text-center py-16">
            <p class="text-gray-500">{{ t('logisticsKnowledge.empty') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeCategory = ref('all')

// 分类数据
const categories = ref([
  { id: 'all', name: '全部' },
  { id: 'air', name: '空运知识' },
  { id: 'sea', name: '海运知识' },
  { id: 'customs', name: '清关知识' },
  { id: 'packaging', name: '包装知识' },
  { id: 'insurance', name: '物流保险' }
])

// 知识文章数据
const articles = ref([
  {
    id: 1,
    title: '国际空运货物尺寸限制及计费标准',
    summary: '本文详细介绍了国际空运中不同机型的货物尺寸限制，以及空运的计费标准和计算方法。',
    icon: '✈️',
    category: 'air'
  },
  {
    id: 2,
    title: '海运集装箱类型及选择指南',
    summary: '了解不同类型的海运集装箱，如何根据货物特点选择合适的集装箱类型。',
    icon: '🚢',
    category: 'sea'
  },
  {
    id: 3,
    title: '国际货物清关流程及所需文件',
    summary: '详细介绍国际货物清关的完整流程，以及不同国家和地区清关所需的文件资料。',
    icon: '📋',
    category: 'customs'
  },
  {
    id: 4,
    title: '危险品包装及运输要求',
    summary: '危险品运输的包装标准和运输要求，确保危险品运输的安全合规。',
    icon: '⚠️',
    category: 'packaging'
  },
  {
    id: 5,
    title: '国际物流保险种类及投保指南',
    summary: '了解国际物流保险的不同种类，如何根据货物价值和运输方式选择合适的保险。',
    icon: '🛡️',
    category: 'insurance'
  },
  {
    id: 6,
    title: '跨境电商物流解决方案',
    summary: '针对跨境电商的特点，提供最优的物流解决方案，平衡成本和时效。',
    icon: '🌐',
    category: 'all'
  }
])

// 过滤文章
const filteredArticles = computed(() => {
  if (activeCategory.value === 'all') {
    return articles.value
  }
  return articles.value.filter(article => article.category === activeCategory.value)
})
</script>
