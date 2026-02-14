<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ t('footer.terms') }}</h1>
        <p class="text-gray-600 max-w-3xl">最后更新时间：2026年1月1日</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-lg p-8">
        <div class="prose prose max-w-none text-gray-700">
          <h2 class="text-2xl font-bold mb-4">1. 服务条款的接受</h2>
          <p class="mb-4">欢迎使用北京鸿驰祥瑞物流有限公司的物流服务。使用本服务即表示您同意遵守本服务条款。</p>

          <h2 class="text-2xl font-bold mb-4">2. 服务内容</h2>
          <p class="mb-4">本公司提供国际空运、海运、中欧班列、国际道路运输、海外仓储、多式联运等综合物流服务。具体服务内容及标准以双方签订的正式合同为准。</p>

          <h2 class="text-2xl font-bold mb-4">3. 客户责任</h2>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>客户应提供真实、准确、完整的货物信息和相关单证</li>
            <li>客户应确保货物符合国际运输的相关法律法规要求</li>
            <li>客户应按时支付服务费用</li>
            <li>客户应配合完成报关、报检等相关手续</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">4. 公司责任</h2>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>公司应按照合同约定提供安全、高效的物流服务</li>
            <li>公司应妥善保管客户货物，确保货物安全</li>
            <li>公司应及时向客户提供货物运输状态信息</li>
            <li>公司应对货物在运输过程中的损坏或丢失承担相应责任</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">5. 费用与支付</h2>
          <p class="mb-4">服务费用根据货物类型、运输方式、目的地等因素确定，具体以双方确认的报价单为准。客户应在服务开始前支付约定费用。</p>

          <h2 class="text-2xl font-bold mb-4">6. 责任限制</h2>
          <p class="mb-4">因不可抗力（如自然灾害、战争、政府禁令等）导致的货物延误、损坏或丢失，公司不承担相应责任。</p>

          <h2 class="text-2xl font-bold mb-4">7. 争议解决</h2>
          <p class="mb-4">如发生争议，双方应首先通过友好协商解决。协商不成的，可提交至有管辖权的人民法院诉讼解决。</p>

          <h2 class="text-2xl font-bold mb-4">8. 条款修改</h2>
          <p class="mb-4">本公司有权根据业务需要修改本服务条款。修改后的条款将通过网站公告或其他方式通知客户。</p>

          <h2 class="text-2xl font-bold mb-4">9. 其他</h2>
          <p class="mb-4">本服务条款的解释权归北京鸿驰祥瑞物流有限公司所有。如有疑问，请联系客服。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
