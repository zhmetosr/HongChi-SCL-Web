<template>
  <div class="py-16">
    <!-- 页面标题 -->
    <section class="bg-primary-light py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">{{ t('quote.title') }}</h1>
        <p class="text-gray-600 text-center mt-4 max-w-2xl mx-auto">{{ t('quote.subtitle') }}</p>
      </div>
    </section>

    <!-- 报价表单 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">{{ t('quote.formTitle') }}</h2>
          
          <form @submit.prevent="handleQuoteSubmit" class="space-y-6">
            <!-- 联系人信息 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.name') }}</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="{{ t('quote.namePlaceholder') }}"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.company') }}</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="{{ t('quote.companyPlaceholder') }}"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.phone') }}</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="{{ t('quote.phonePlaceholder') }}"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.email') }}</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="{{ t('quote.emailPlaceholder') }}"
                />
              </div>
            </div>

            <!-- 货物信息 -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-800">{{ t('quote.cargoInfo') }}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.cargoType') }}</label>
                  <select
                    v-model="form.cargoType"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">{{ t('quote.cargoTypePlaceholder') }}</option>
                    <option value="general">{{ t('quote.cargoTypeGeneral') }}</option>
                    <option value="dangerous">{{ t('quote.cargoTypeDangerous') }}</option>
                    <option value="refrigerated">{{ t('quote.cargoTypeRefrigerated') }}</option>
                    <option value="oversized">{{ t('quote.cargoTypeOversized') }}</option>
                    <option value="valuable">{{ t('quote.cargoTypeValuable') }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.weight') }}</label>
                  <div class="flex">
                    <input
                      v-model="form.weight"
                      type="number"
                      step="0.1"
                      required
                      class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="{{ t('quote.weightPlaceholder') }}"
                    />
                    <span class="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">kg</span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.volume') }}</label>
                  <div class="flex">
                    <input
                      v-model="form.volume"
                      type="number"
                      step="0.1"
                      class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="{{ t('quote.volumePlaceholder') }}"
                    />
                    <span class="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">m³</span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.pieces') }}</label>
                  <input
                    v-model="form.pieces"
                    type="number"
                    min="1"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="{{ t('quote.piecesPlaceholder') }}"
                  />
                </div>
              </div>
            </div>

            <!-- 运输信息 -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-800">{{ t('quote.transportInfo') }}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.origin') }}</label>
                  <input
                    v-model="form.origin"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="{{ t('quote.originPlaceholder') }}"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.destination') }}</label>
                  <input
                    v-model="form.destination"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="{{ t('quote.destinationPlaceholder') }}"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.transportMode') }}</label>
                  <select
                    v-model="form.transportMode"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">{{ t('quote.transportModePlaceholder') }}</option>
                    <option value="air">{{ t('quote.transportModeAir') }}</option>
                    <option value="sea">{{ t('quote.transportModeSea') }}</option>
                    <option value="rail">{{ t('quote.transportModeRail') }}</option>
                    <option value="road">{{ t('quote.transportModeRoad') }}</option>
                    <option value="multimodal">{{ t('quote.transportModeMultimodal') }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.shipmentDate') }}</label>
                  <input
                    v-model="form.shipmentDate"
                    type="date"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <!-- 其他信息 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('quote.otherInfo') }}</label>
              <textarea
                v-model="form.otherInfo"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="{{ t('quote.otherInfoPlaceholder') }}"
              ></textarea>
            </div>

            <!-- 提交按钮 -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? t('quote.submitting') : t('quote.submit') }}
              </button>
              <p class="text-gray-500 text-sm text-center mt-4">{{ t('quote.notice') }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- 服务优势 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ t('quote.advantagesTitle') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">{{ t('quote.advantagesSubtitle') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-card-hover transition-shadow">
            <div class="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <span class="text-xl">⚡</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ t('quote.advantageFast') }}</h3>
            <p class="text-gray-600">{{ t('quote.advantageFastDesc') }}</p>
          </div>
          <div class="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-card-hover transition-shadow">
            <div class="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <span class="text-xl">💰</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ t('quote.advantageAccurate') }}</h3>
            <p class="text-gray-600">{{ t('quote.advantageAccurateDesc') }}</p>
          </div>
          <div class="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-card-hover transition-shadow">
            <div class="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <span class="text-xl">🔒</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ t('quote.advantageProfessional') }}</h3>
            <p class="text-gray-600">{{ t('quote.advantageProfessionalDesc') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)

const form = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  cargoType: '',
  weight: '',
  volume: '',
  pieces: '',
  origin: '',
  destination: '',
  transportMode: '',
  shipmentDate: '',
  otherInfo: ''
})

const handleQuoteSubmit = async () => {
  loading.value = true
  
  try {
    // 模拟提交请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 提交成功
    alert(t('quote.submitSuccess'))
    form.value = {
      name: '',
      company: '',
      phone: '',
      email: '',
      cargoType: '',
      weight: '',
      volume: '',
      pieces: '',
      origin: '',
      destination: '',
      transportMode: '',
      shipmentDate: '',
      otherInfo: ''
    }
  } catch (error) {
    alert(t('quote.submitError'))
  } finally {
    loading.value = false
  }
}
</script>
