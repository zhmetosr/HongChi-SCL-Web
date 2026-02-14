<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ t('announcements.title') }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('announcements.subtitle') }}</p>
      </div>
    </section>

    <!-- 公告列表 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- 公告列表 -->
          <div class="space-y-6">
            <div v-for="announcement in announcements" :key="announcement.id" class="border-l-4 border-primary bg-primary-light/30 p-6 rounded-r-lg">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-800">{{ announcement.title }}</h3>
                <span class="text-sm text-gray-500">{{ announcement.date }}</span>
              </div>
              <p class="text-gray-600 mb-4">{{ announcement.content }}</p>
              <div v-if="announcement.important" class="inline-block px-3 py-1 bg-primary text-white text-sm rounded-full">
                {{ t('announcements.important') }}
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="announcements.length === 0" class="text-center py-16">
            <p class="text-gray-500">{{ t('announcements.empty') }}</p>
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

// 模拟公告数据
const announcements = ref([
  {
    id: 1,
    title: '关于春节期间物流服务调整的通知',
    content: '尊敬的客户，2026年春节期间（2月1日-2月15日），我司物流服务将有所调整，部分线路可能会有延迟，请提前安排发货计划。',
    date: '2026-01-20',
    important: true
  },
  {
    id: 2,
    title: '系统升级通知',
    content: '为了提供更好的服务，我司物流管理系统将于2026年1月28日凌晨2:00-4:00进行升级维护，期间系统可能暂时无法访问。',
    date: '2026-01-25',
    important: true
  },
  {
    id: 3,
    title: '新增服务线路通知',
    content: '即日起，我司新增北京至悉尼、上海至洛杉矶的直达空运线路，欢迎广大客户咨询使用。',
    date: '2026-01-15',
    important: false
  },
  {
    id: 4,
    title: '运费调整通知',
    content: '由于燃油价格上涨，自2026年2月1日起，我司国际空运和海运服务的基础运费将上调5%。',
    date: '2026-01-10',
    important: false
  }
])
</script>
