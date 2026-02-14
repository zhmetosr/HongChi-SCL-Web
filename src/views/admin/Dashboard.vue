<template>
  <div class="dashboard">
    <el-card shadow="hover" class="mb-4">
      <template #header>
        <div class="flex justify-between items-center">
          <span>系统概览</span>
          <el-button type="primary" size="small">
            <el-icon><Refresh /></el-icon>
            刷新数据
          </el-button>
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <el-card class="text-center">
          <el-icon class="text-blue-500 text-2xl mb-2"><User /></el-icon>
          <h3 class="text-xl font-bold mb-1">1,234</h3>
          <p class="text-gray-500">客户总数</p>
        </el-card>
        <el-card class="text-center">
          <el-icon class="text-green-500 text-2xl mb-2"><ShoppingCart /></el-icon>
          <h3 class="text-xl font-bold mb-1">567</h3>
          <p class="text-gray-500">今日订单</p>
        </el-card>
        <el-card class="text-center">
          <el-icon class="text-yellow-500 text-2xl mb-2"><Menu /></el-icon>
          <h3 class="text-xl font-bold mb-1">89</h3>
          <p class="text-gray-500">运输中</p>
        </el-card>
        <el-card class="text-center">
          <el-icon class="text-red-500 text-2xl mb-2"><Coin /></el-icon>
          <h3 class="text-xl font-bold mb-1">¥128,900</h3>
          <p class="text-gray-500">今日营收</p>
        </el-card>
      </div>
    </el-card>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <el-card shadow="hover">
        <template #header>
          <span>最近订单</span>
        </template>
        <el-table :data="recentOrders" stripe style="width: 100%">
          <el-table-column prop="orderNo" label="订单号" width="180" />
          <el-table-column prop="customer" label="客户" />
          <el-table-column prop="amount" label="金额" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
        </el-table>
      </el-card>

      <el-card shadow="hover">
        <template #header>
          <span>运营数据</span>
        </template>
        <el-chart :option="chartOption" style="height: 300px" />
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Refresh, User, ShoppingCart, Menu, Coin } from '@element-plus/icons-vue'

// 模拟最近订单数据
const recentOrders = ref([
  {
    orderNo: 'HC20260213001',
    customer: '北京京东物流',
    amount: '¥12,500',
    status: '已完成',
    createTime: '2026-02-13 10:30'
  },
  {
    orderNo: 'HC20260213002',
    customer: '上海苏宁易购',
    amount: '¥8,900',
    status: '运输中',
    createTime: '2026-02-13 09:15'
  },
  {
    orderNo: 'HC20260213003',
    customer: '广州唯品会',
    amount: '¥15,600',
    status: '待发货',
    createTime: '2026-02-13 08:45'
  },
  {
    orderNo: 'HC20260212001',
    customer: '深圳腾讯科技',
    amount: '¥23,400',
    status: '已完成',
    createTime: '2026-02-12 16:20'
  },
  {
    orderNo: 'HC20260212002',
    customer: '杭州阿里巴巴',
    amount: '¥18,700',
    status: '已完成',
    createTime: '2026-02-12 14:30'
  }
])

// 模拟图表数据
const chartOption = ref({
  title: {
    text: '近7日订单量',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['2月7日', '2月8日', '2月9日', '2月10日', '2月11日', '2月12日', '2月13日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 132, 101, 134, 90, 230, 210],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#409EFF'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(64, 158, 255, 0.5)'
          }, {
            offset: 1, color: 'rgba(64, 158, 255, 0.1)'
          }]
        }
      }
    }
  ]
})

// 根据状态获取标签类型
const getStatusType = (status) => {
  const statusMap = {
    '待发货': 'warning',
    '运输中': 'info',
    '已完成': 'success',
    '已取消': 'danger'
  }
  return statusMap[status] || 'default'
}

onMounted(() => {
  // 这里可以添加实际的数据获取逻辑
  console.log('Dashboard mounted')
})
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 120px);
}
</style>