<template>
  <div class="dashboard-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1>欢迎使用鸿驰祥瑞管理后台</h1>
        <p>北京鸿驰祥瑞物流有限公司 - 客户为先、真诚利他、长期价值</p>
      </div>
    </div>

    <!-- 核心数据卡片 -->
    <el-row :gutter="20" style="margin-bottom: 24px;">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon delivery">
              <svg-icon icon-class="shopping" />
            </div>
            <div class="stat-info">
              <h3>今日配送</h3>
              <p class="stat-number">128</p>
              <p class="stat-desc">较昨日 +12%</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon order">
              <svg-icon icon-class="list" />
            </div>
            <div class="stat-info">
              <h3>今日订单</h3>
              <p class="stat-number">256</p>
              <p class="stat-desc">较昨日 +8%</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon customer">
              <svg-icon icon-class="user" />
            </div>
            <div class="stat-info">
              <h3>活跃客户</h3>
              <p class="stat-number">89</p>
              <p class="stat-desc">较昨日 +5%</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon revenue">
              <svg-icon icon-class="money" />
            </div>
            <div class="stat-info">
              <h3>今日收入</h3>
              <p class="stat-number">¥12,890</p>
              <p class="stat-desc">较昨日 +15%</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 运营数据 -->
    <el-row :gutter="20" style="margin-bottom: 24px;">
      <el-col :xs="24" :lg="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>配送趋势</span>
              <el-select v-model="trendType" size="small" style="margin-left: 10px;">
                <el-option label="今日" value="day" />
                <el-option label="本周" value="week" />
                <el-option label="本月" value="month" />
              </el-select>
            </div>
          </template>
          <div class="chart-container">
            <div id="delivery-trend-chart" class="chart"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card shadow="hover" style="margin-bottom: 24px;">
          <template #header>
            <div class="card-header">
              <span>配送状态</span>
            </div>
          </template>
          <div class="status-list">
            <div class="status-item">
              <span class="status-dot pending"></span>
              <span class="status-text">待配送</span>
              <span class="status-count">32</span>
            </div>
            <div class="status-item">
              <span class="status-dot delivering"></span>
              <span class="status-text">配送中</span>
              <span class="status-count">45</span>
            </div>
            <div class="status-item">
              <span class="status-dot completed"></span>
              <span class="status-text">已完成</span>
              <span class="status-count">128</span>
            </div>
            <div class="status-item">
              <span class="status-dot cancelled"></span>
              <span class="status-text">已取消</span>
              <span class="status-count">5</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>数据监控</span>
            </div>
          </template>
          <div class="monitoring-list">
            <div class="monitoring-item">
              <span class="monitoring-text">访问人数</span>
              <span class="monitoring-count">2,568</span>
            </div>
            <div class="monitoring-item">
              <span class="monitoring-text">页面浏览</span>
              <span class="monitoring-count">8,924</span>
            </div>
            <div class="monitoring-item">
              <span class="monitoring-text">平均停留</span>
              <span class="monitoring-count">3:45</span>
            </div>
            <div class="monitoring-item">
              <span class="monitoring-text">跳出率</span>
              <span class="monitoring-count">28%</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近订单 -->
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>最近订单</span>
          <el-button type="primary" size="small" plain @click="viewAllOrders">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentOrders" stripe style="width: 100%">
        <el-table-column prop="orderId" label="订单号" width="180" />
        <el-table-column prop="customer" label="客户" />
        <el-table-column prop="amount" label="金额" width="120">
          <template slot-scope="scope">
            ¥{{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  name: 'DashboardAdmin',
  data() {
    return {
      trendType: 'day',
      chart: null,
      $_resizeHandler: null,
      recentOrders: [
        {
          orderId: 'HC20260212001',
          customer: '北京京东世纪贸易有限公司',
          amount: 1280,
          status: '已完成',
          createTime: '2026-02-12 09:30'
        },
        {
          orderId: 'HC20260212002',
          customer: '北京苏宁云商销售有限公司',
          amount: 2560,
          status: '配送中',
          createTime: '2026-02-12 10:15'
        },
        {
          orderId: 'HC20260212003',
          customer: '北京国美电器有限公司',
          amount: 1890,
          status: '待配送',
          createTime: '2026-02-12 11:20'
        },
        {
          orderId: 'HC20260212004',
          customer: '北京亚马逊世纪贸易有限公司',
          amount: 3240,
          status: '配送中',
          createTime: '2026-02-12 12:45'
        },
        {
          orderId: 'HC20260212005',
          customer: '北京当当网信息技术有限公司',
          amount: 1560,
          status: '已完成',
          createTime: '2026-02-12 13:30'
        }
      ]
    }
  },
  computed: {
    chartData() {
      const data = {
        day: {
          xAxis: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          series: [12, 19, 3, 5, 2, 3, 15, 8]
        },
        week: {
          xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          series: [120, 132, 101, 134, 90, 230, 210]
        },
        month: {
          xAxis: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
          series: [1200, 1320, 1010, 1340, 900, 2300, 2100]
        }
      }
      return data[this.trendType]
    }
  },
  watch: {
    trendType: {
      handler() {
        this.updateChart()
      }
    }
  },
  mounted() {
    this.initListener()
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    this.destroyListener()
  },
  methods: {
    getStatusType(status) {
      switch (status) {
        case '待配送':
          return 'info'
        case '配送中':
          return 'warning'
        case '已完成':
          return 'success'
        case '已取消':
          return 'danger'
        default:
          return ''
      }
    },
    viewAllOrders() {
      // 跳转到订单列表页面
      this.$router.push('/order/list')
    },
    initListener() {
      this.$_resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)
    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('delivery-trend-chart'))
      this.updateChart()
    },
    updateChart() {
      if (!this.chart) return
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '配送量'
          }
        ],
        series: [
          {
            name: '配送量',
            type: 'line',
            data: this.chartData.series,
            itemStyle: {
              color: '#409eff'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(64, 158, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(64, 158, 255, 0.1)'
                }
              ])
            }
          }
        ]
      }
      
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: #f5f7fa;
}

.welcome-section {
  background: none;
  color: #303133;
  padding: 20px 0;
  margin-bottom: 24px;

  .welcome-content {
    max-width: 100%;
    text-align: center;

    h1 {
      font-size: 24px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      color: #606266;
    }
  }
}

.stat-card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

.stat-content {
  display: flex;
  align-items: center;

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 24px;
    color: white;

    &.delivery {
      background-color: #409eff;
    }

    &.order {
      background-color: #67c23a;
    }

    &.customer {
      background-color: #e6a23c;
    }

    &.revenue {
      background-color: #f56c6c;
    }
  }

  .stat-info {
    flex: 1;

    h3 {
      font-size: 14px;
      color: #606266;
      margin: 0 0 8px 0;
      font-weight: normal;
    }

    .stat-number {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 4px 0;
    }

    .stat-desc {
      font-size: 12px;
      color: #909399;
      margin: 0;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 600;
    color: #303133;
  }
}

.chart-container {
  height: 300px;
  position: relative;
  width: 100%;
}

#delivery-trend-chart {
  width: 100%;
  height: 100%;
}

.status-list {
  padding: 10px 0;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;

    &.pending {
      background-color: #409eff;
    }

    &.delivering {
      background-color: #e6a23c;
    }

    &.completed {
      background-color: #67c23a;
    }

    &.cancelled {
      background-color: #f56c6c;
    }
  }

  .status-text {
    flex: 1;
    color: #606266;
  }

  .status-count {
    font-weight: 600;
    color: #303133;
  }
}

.monitoring-list {
  padding: 10px 0;
}

.monitoring-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .monitoring-text {
    color: #606266;
  }

  .monitoring-count {
    font-weight: 600;
    color: #303133;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }

  .welcome-section {
    padding: 24px;

    .welcome-content h1 {
      font-size: 20px;
    }

    .welcome-content p {
      font-size: 14px;
    }
  }

  .stat-content {
    flex-direction: column;
    text-align: center;

    .stat-icon {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
}
</style>
