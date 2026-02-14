<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ t('nav.contact') }}</h1>
        <p class="text-gray-600 max-w-3xl">{{ t('home.coreServicesDesc') }}</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧表单 -->
        <div class="bg-white rounded-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">国际国内货运代理物流运输业务需求</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- 收发货人信息 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">联系人信息</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">公司名称 *</label>
                  <input
                    v-model="form.company"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入公司名称"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">联系人 *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入联系人姓名"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">联系电话 *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入联系电话"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">电子邮箱 *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入电子邮箱"
                  />
                </div>
              </div>
            </div>

            <!-- 固定格式需求描述 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">需求描述</h3>
              <div class="space-y-4">
                <!-- 01 货物名称 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">01、货物名称：</label>
                  <input
                    v-model="form.goodsName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入货物名称"
                  />
                </div>

                <!-- 02 HS编码/UN编码 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">02、HS编码/UN编码：</label>
                  <input
                    v-model="form.hsCode"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入HS编码或UN编码"
                  />
                </div>

                <!-- 03 包装方式 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">03、包装方式：</label>
                  <select
                    v-model="form.packageType"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">请选择</option>
                    <option value="纸箱">纸箱</option>
                    <option value="木箱">木箱</option>
                    <option value="托盘">托盘</option>
                    <option value="散装">散装</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <!-- 04 单件重量 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">04、单件重量（kg）：</label>
                  <input
                    v-model="form.singleWeight"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入单件重量"
                  />
                </div>

                <!-- 05 单件尺寸 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">05、单件尺寸（cm）：</label>
                  <input
                    v-model="form.singleSize"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="例如：长x宽x高"
                  />
                </div>

                <!-- 06 件数 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">06、件数：</label>
                  <input
                    v-model="form.quantity"
                    type="number"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入件数"
                  />
                </div>

                <!-- 07 合计总重量 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">07、合计总重量：</label>
                  <input
                    v-model="form.totalWeight"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入合计总重量"
                  />
                </div>

                <!-- 08 合计总体积 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">08、合计总体积：</label>
                  <input
                    v-model="form.totalVolume"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入合计总体积"
                  />
                </div>

                <!-- 09 货物总价值 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">09、货物总价值：</label>
                  <input
                    v-model="form.totalValue"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入货物总价值"
                  />
                </div>

                <!-- 10 发货详细地址 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">10、发货详细地址：省--市--区--路--号</label>
                  <input
                    v-model="form.senderAddr"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入详细发货地址"
                  />
                </div>

                <!-- 11 收货详细地址+邮编 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">11、收货详细地址+邮编</label>
                  <input
                    v-model="form.receiverAddr"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="请输入详细收货地址和邮编"
                  />
                </div>

                <!-- 12 货物照片 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">12、货物照片：</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    @change="handleFileChange"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <!-- 13 贸易条款 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">13、贸易条款：FOB/CIF/ DAP等</label>
                  <select
                    v-model="form.tradeTerms"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">请选择</option>
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                    <option value="DAP">DAP</option>
                    <option value="EXW">EXW</option>
                    <option value="FCA">FCA</option>
                    <option value="CPT">CPT</option>
                    <option value="CIP">CIP</option>
                    <option value="DAT">DAT</option>
                    <option value="DDP">DDP</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 提交按钮 -->
            <button
              type="submit"
              :disabled="submitting"
              class="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary-hover transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? '提交中...' : '提交需求' }}
            </button>
          </form>
        </div>

        <!-- 右侧信息 -->
        <div class="space-y-6">
          <!-- 智能识别 -->
          <div class="bg-white rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">智能识别</h3>
            <p class="text-gray-600 mb-4">粘贴或输入货物信息，系统将自动提取关键信息</p>
            <textarea
              v-model="smartText"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all mb-4"
              placeholder="例如：名称：电子产品，包装：纸箱，重量：10kg，尺寸：30x20x15cm，件数：100"
            ></textarea>
            <button
              @click="autoRecognize"
              type="button"
              class="w-full py-3 bg-primary-light text-primary rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              自动识别填充
            </button>
          </div>

          <!-- 联系方式 -->
          <div class="bg-white rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">联系方式</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">服务热线</p>
                  <p class="text-lg font-semibold text-gray-800">+86 139 1118 2428</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">微信咨询</p>
                  <p class="text-lg font-semibold text-gray-800">13911182428</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">电子邮箱</p>
                  <p class="text-lg font-semibold text-gray-800">zhangxiang@hongchixiangrui.com</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 服务时间 -->
          <div class="bg-gradient-to-br from-primary to-primary-hover rounded-lg p-6 text-white">
            <h3 class="text-xl font-semibold mb-4">服务时间</h3>
            <div class="space-y-2">
              <p>周一至周五：8:00 - 18:00</p>
              <p>周六至周日：9:00 - 17:00</p>
              <p class="mt-4 text-white/80">提交后我们将在2小时内与您联系</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 报价单导出组件（隐藏） -->
      <QuoteExport
        ref="quoteExportRef"
        :quote-form="form"
        :quote-items="quoteItems"
        :total-amount="totalAmount"
        :currency="currency"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import QuoteExport from '@/components/QuoteExport.vue'

const { t } = useI18n()
const quoteExportRef = ref(null)
const submitting = ref(false)
const smartText = ref('')

const form = ref({
  company: '',
  name: '',
  phone: '',
  email: '',
  goodsName: '',
  hsCode: '',
  packageType: '',
  singleWeight: '',
  singleSize: '',
  quantity: '',
  totalWeight: '',
  totalVolume: '',
  totalValue: '',
  senderAddr: '',
  receiverAddr: '',
  goodsPhoto: '',
  tradeTerms: ''
})

const handleFileChange = (event) => {
  const files = event.target.files
  if (files) {
    // 这里可以根据实际需求处理文件，例如上传到服务器或预览
    console.log('Selected files:', files)
    // 由于是模拟环境，我们只在控制台记录文件信息
  }
}

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    // 模拟API提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('提交成功！')
    
    // 重置表单
    form.value = {
      company: '',
      name: '',
      phone: '',
      email: '',
      goodsName: '',
      hsCode: '',
      packageType: '',
      singleWeight: '',
      singleSize: '',
      quantity: '',
      totalWeight: '',
      totalVolume: '',
      totalValue: '',
      senderAddr: '',
      receiverAddr: '',
      tradeTerms: ''
    }
    smartText.value = ''
    // 重置文件输入
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ''
    }
  } catch (error) {
    alert('提交失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>
