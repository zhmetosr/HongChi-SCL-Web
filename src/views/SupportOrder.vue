<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <section class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800">下单发货</h1>
        <p class="text-gray-600 mt-2">便捷的物流服务下单流程</p>
      </div>
    </section>

    <!-- 主要内容 -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">下单流程</h2>
          
          <div class="space-y-8">
            <!-- 步骤1 -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">1</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">填写发货信息</h3>
                <p class="text-gray-600">提供发货地址、收货地址、货物信息等详细内容</p>
              </div>
            </div>
            
            <!-- 步骤2 -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">2</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">选择服务类型</h3>
                <p class="text-gray-600">根据您的需求选择空运、海运、铁路运输或公路运输等服务</p>
              </div>
            </div>
            
            <!-- 步骤3 -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">3</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">获取报价</h3>
                <p class="text-gray-600">系统将根据您提供的信息生成详细报价</p>
              </div>
            </div>
            
            <!-- 步骤4 -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">4</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">确认订单</h3>
                <p class="text-gray-600">确认订单信息并完成支付</p>
              </div>
            </div>
            
            <!-- 步骤5 -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">5</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">安排发货</h3>
                <p class="text-gray-600">我们将根据您的要求安排专业人员上门取货或您自行送货到指定地点</p>
              </div>
            </div>
          </div>
          
          <div class="mt-10 text-center">
            <router-link to="/quote" class="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              立即下单
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
/* 自定义样式 */
</style>