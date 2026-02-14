<template>
  <div>
    <!-- Banner轮播 -->
    <Banner />





    <!-- 核心服务 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ t('home.coreServices') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">{{ t('home.coreServicesDesc') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, index) in coreServices" :key="index" class="bg-white rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow">
            <div class="h-48 overflow-hidden">
              <img 
                :src="item.image" 
                :alt="item.title" 
                class="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ t(`home.services.${item.key}.title`) }}</h3>
              <p class="text-gray-600 mb-4">{{ t(`home.services.${item.key}.desc`) }}</p>
              <router-link to="/services" class="text-primary font-medium hover:text-primary-hover transition-colors">
                {{ t('home.learnMore') }} →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="py-16 bg-primary text-white" ref="statisticsRef">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(item, index) in statistics" :key="index" class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">
              {{ animatedNumbers[index] }}{{ item.suffix }}
            </div>
            <div class="text-white/80">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作流程 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ t('home.process.title') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">{{ t('home.process.desc') }}</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="(item, index) in process" :key="index" class="text-center relative">
              <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {{ index + 1 }}
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.desc }}</p>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="py-16 bg-primary text-white shadow-lg">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.cta.title') }}</h2>
        <p class="text-white/90 mb-8 max-w-2xl mx-auto">{{ t('home.cta.desc') }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/contact" class="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            {{ t('home.cta.consult') }}
          </router-link>
          <a href="tel:+8613911182428" class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
            {{ t('home.cta.call') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Banner from '@/components/Banner.vue'

const { t } = useI18n()

const animatedNumbers = ref([0, 0, 0, 0])
const statisticsRef = ref(null)
const hasAnimated = ref(false)

const coreServices = ref([
  {
    key: 'air',
    image: '/图片1.png'
  },
  {
    key: 'sea',
    image: '/图片2.png'
  },
  {
    key: 'rail',
    image: '/图片3.png'
  },
  {
    key: 'road',
    image: '/图片4.png'
  },
  {
    key: 'warehouse',
    image: '/图片5.png'
  },
  {
    key: 'multimodal',
    image: '/图片6.png'
  }
])

const statistics = ref([
  { value: 17, suffix: '', label: t('home.statistics.experience') },
  { value: 200, suffix: '+', label: t('home.statistics.countries') },
  { value: 5000, suffix: '+', label: t('home.statistics.clients') },
  { value: 99, suffix: '%', label: t('home.statistics.satisfaction') }
])

const process = computed(() => [
  {
    title: t('home.process.steps.consult.title'),
    desc: t('home.process.steps.consult.desc')
  },
  {
    title: t('home.process.steps.plan.title'),
    desc: t('home.process.steps.plan.desc')
  },
  {
    title: t('home.process.steps.confirm.title'),
    desc: t('home.process.steps.confirm.desc')
  },
  {
    title: t('home.process.steps.track.title'),
    desc: t('home.process.steps.track.desc')
  }
])

const animateAllNumbers = (duration = 2000) => {
  const startValues = [0, 0, 0, 0]
  const targetValues = statistics.value.map(item => item.value)
  const startTime = performance.now()
  
  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    targetValues.forEach((targetValue, index) => {
      const currentValue = Math.floor(startValues[index] + (targetValue - startValues[index]) * easeOutQuart)
      animatedNumbers.value[index] = currentValue
    })
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
  hasAnimated.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated.value) {
        animateAllNumbers()
      }
    })
  }, {
    threshold: 0.1
  })
  
  if (statisticsRef.value) {
    observer.observe(statisticsRef.value)
  }
})
</script>

<style scoped>
.animate-drop {
  animation: drop 1s ease-out forwards;
  transform-origin: center;
}

@keyframes drop {
  0% {
    transform: translateY(-100px) scale(1.5);
    opacity: 0;
  }
  60% {
    transform: translateY(20px) scale(0.95);
    opacity: 1;
  }
  80% {
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
</style>
