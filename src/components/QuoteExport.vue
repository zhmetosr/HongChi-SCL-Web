<template>
  <div class="hidden" ref="quoteRef">
    <!-- 报价单PDF模板（A4尺寸） -->
    <div class="w-[210mm] h-[297mm] p-[20mm] bg-white mx-auto">
      <!-- 报价单头部 -->
      <div class="flex justify-between items-start mb-8">
        <div class="w-40 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">H</span>
        </div>
        <div class="text-right">
          <h3 class="text-xl font-bold text-gray-800">报价单</h3>
          <p class="text-gray-600 mt-1">报价单号：{{ quoteNo }}</p>
          <p class="text-gray-600">日期：{{ createDate }}</p>
        </div>
      </div>

      <!-- 客户需求信息 -->
      <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">客户需求信息</h4>
        <div class="grid grid-cols-2 gap-4 text-gray-700">
          <div><span class="font-medium">公司名称：</span>{{ quoteForm.company }}</div>
          <div><span class="font-medium">联系人：</span>{{ quoteForm.name }}</div>
          <div><span class="font-medium">联系电话：</span>{{ quoteForm.phone }}</div>
          <div><span class="font-medium">电子邮箱：</span>{{ quoteForm.email }}</div>
          <div><span class="font-medium">取货地址：</span>{{ quoteForm.pickupAddr }}</div>
          <div><span class="font-medium">送货地址：</span>{{ quoteForm.deliveryAddr }}</div>
        </div>

        <!-- 货物信息表格 -->
        <div class="mt-6">
          <h5 class="font-medium text-gray-800 mb-2">货物明细</h5>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-primary-light">
                <th class="border border-gray-300 p-2 text-left">货物名称</th>
                <th class="border border-gray-300 p-2 text-left">包装方式</th>
                <th class="border border-gray-300 p-2 text-left">单件重量(kg)</th>
                <th class="border border-gray-300 p-2 text-left">单件尺寸(cm)</th>
                <th class="border border-gray-300 p-2 text-left">件数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in quoteForm.goodsList" :key="index">
                <td class="border border-gray-300 p-2">{{ item.name }}</td>
                <td class="border border-gray-300 p-2">{{ item.package }}</td>
                <td class="border border-gray-300 p-2">{{ item.weight }}</td>
                <td class="border border-gray-300 p-2">{{ item.size }}</td>
                <td class="border border-gray-300 p-2">{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="border-t-2 border-dashed border-gray-300 my-8"></div>

      <!-- 报价信息 -->
      <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">报价详情</h4>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-primary-light">
              <th class="border border-gray-300 p-2 text-left">服务类型</th>
              <th class="border border-gray-300 p-2 text-left">费用金额</th>
              <th class="border border-gray-300 p-2 text-left">币种</th>
              <th class="border border-gray-300 p-2 text-left">备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in quoteItems" :key="index">
              <td class="border border-gray-300 p-2">{{ item.type }}</td>
              <td class="border border-gray-300 p-2">{{ item.amount }}</td>
              <td class="border border-gray-300 p-2">{{ item.currency }}</td>
              <td class="border border-gray-300 p-2">{{ item.remark }}</td>
            </tr>
            <tr class="bg-gray-50 font-medium">
              <td class="border border-gray-300 p-2" colspan="3">合计金额</td>
              <td class="border border-gray-300 p-2">{{ totalAmount }} {{ currency }}</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 text-gray-700">
          <p><span class="font-medium">报价有效期：</span>{{ validStartDate }} - {{ validEndDate }}</p>
        </div>
      </div>

      <!-- 报价方信息 + 盖章 -->
      <div class="flex justify-between items-end mt-12">
        <div class="text-gray-700">
          <h4 class="text-lg font-semibold">北京鸿驰祥瑞物流有限公司</h4>
          <p class="mt-1">Beijing Hongchi Xiangrui Logistics Co., Ltd.</p>
          <p class="mt-2">联系人：张翔（David）</p>
          <p>手机：+8613911182428</p>
          <p>微信：13911182428</p>
          <p>邮箱：zhangxiang@hongchixiangrui.com</p>
        </div>
        <!-- 电子签章 -->
        <div class="w-32 h-32 relative">
          <div class="absolute inset-0 flex items-center justify-center border-2 border-red-500 rounded-full">
            <div class="text-center">
              <p class="text-sm text-red-500 font-medium">北京鸿驰祥瑞物流</p>
              <p class="text-xs text-red-500 mt-1">业务专用章</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  quoteForm: {
    type: Object,
    required: true
  },
  quoteItems: {
    type: Array,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'CNY'
  }
})

const quoteRef = ref(null)

// 生成报价单号（规则：客户简称首字母+年月日+序号）
const generateQuoteNo = () => {
  const prefix = props.quoteForm.company.substring(0, 3).toUpperCase()
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}${date}${random}`
}

const quoteNo = ref(generateQuoteNo())
const createDate = ref(new Date().toLocaleDateString())
const validStartDate = ref(new Date().toLocaleDateString())
const validEndDate = ref(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString())

// 导出PDF
const exportQuote = async () => {
  try {
    const { default: html2canvas } = await import('html2canvas')
    const { PDFDocument } = await import('pdf-lib')
    
    const canvas = await html2canvas(quoteRef.value, {
      scale: 2,
      useCORS: true
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89])
    const img = await pdfDoc.embedPng(imgData)
    
    const { width, height } = img.scale(1)
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: 595.28,
      height: 841.89
    })
    
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `报价单_${quoteNo.value}.pdf`
    link.click()
    
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('导出PDF失败:', error)
    alert('导出PDF失败，请稍后重试')
  }
}

// 分享功能
const shareQuote = (type = 'wechat') => {
  // 微信/WhatsApp分享逻辑
  const shareText = `报价单 ${quoteNo.value} - 北京鸿驰祥瑞物流有限公司`
  const shareUrl = window.location.href
  
  if (type === 'wechat') {
    // 微信分享提示
    alert('请使用微信扫码分享')
  } else if (type === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`)
  }
}

defineExpose({
  exportQuote,
  shareQuote
})
</script>
