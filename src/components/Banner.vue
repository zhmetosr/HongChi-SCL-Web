<template>
  <div class="relative overflow-hidden -mt-4">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="h-[520px] md:h-[620px]"
    >
      <SwiperSlide v-for="(item, index) in bannerList" :key="index" class="relative">
        <!-- 背景图片 -->
        <img 
          :src="item.image" 
          :alt="item.title" 
          class="absolute inset-0 w-full h-full object-cover object-top image-rendering-optimize"
        />
        <div class="absolute inset-0 bg-blue-600/50 z-10"></div>
        <div class="absolute inset-0 flex items-center justify-center z-20">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl text-center">
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeIn">
                  {{ t(`home.services.${item.key}.title`) }}
                </h2>
                <p class="text-lg md:text-xl text-white/90 mb-8 animate-fadeIn">
                  {{ t(`home.services.${item.key}.desc`) }}
                </p>
                <router-link
                  to="/contact"
                  class="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {{ t('home.cta.consult') }}
                </router-link>
              </div>
          </div>
        </div>
        <!-- 装饰元素 -->
        <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-20"></div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { t } = useI18n()

const modules = [Autoplay, Pagination, Navigation]

const bannerList = ref([
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
</script>

<style scoped>
.image-rendering-optimize {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  object-fit: cover;
}
</style>
