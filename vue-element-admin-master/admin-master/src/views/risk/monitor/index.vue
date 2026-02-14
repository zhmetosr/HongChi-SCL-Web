<template>
  <div class="risk-monitor-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="风险类型">
          <el-select v-model="searchForm.riskType" placeholder="请选择风险类型" clearable>
            <el-option label="交易风险" value="transaction" />
            <el-option label="运输风险" value="transport" />
            <el-option label="资金风险" value="finance" />
            <el-option label="合规风险" value="compliance" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级">
          <el-select v-model="searchForm.riskLevel" placeholder="请选择风险等级" clearable>
            <el-option label="低风险" value="low" />
            <el-option label="中风险" value="medium" />
            <el-option label="高风险" value="high" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="searchForm.status" placeholder="请选择处理状态" clearable>
            <el-option label="未处理" value="pending" />
            <el-option label="处理中" value="processing" />
            <el-option label="已处理" value="completed" />
            <el-option label="已关闭" value="closed" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增风险事件</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <div class="stats-container">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">总风险事件</div>
              <div class="stat-value">{{ totalRiskEvents }}</div>
              <div class="stat-change" :class="{ positive: riskChange >= 0 }">
                {{ riskChange >= 0 ? '+' : '' }}{{ riskChange }}% 较上周
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">未处理风险</div>
              <div class="stat-value">{{ pendingRiskEvents }}</div>
              <div class="stat-change" :class="{ positive: pendingChange >= 0 }">
                {{ pendingChange >= 0 ? '+' : '' }}{{ pendingChange }}% 较上周
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">高风险事件</div>
              <div class="stat-value">{{ highRiskEvents }}</div>
              <div class="stat-change" :class="{ positive: highRiskChange >= 0 }">
                {{ highRiskChange >= 0 ? '+' : '' }}{{ highRiskChange }}% 较上周
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">平均处理时长</div>
              <div class="stat-value">{{ avgProcessTime }} 小时</div>
              <div class="stat-change" :class="{ positive: processTimeChange >= 0 }">
                {{ processTimeChange >= 0 ? '+' : '' }}{{ processTimeChange }}% 较上周
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div class="risk-trend-container">
        <el-card shadow="never" class="trend-card">
          <div slot="header" class="trend-header">
            <span>风险事件趋势</span>
            <el-select v-model="trendPeriod" size="small" @change="getRiskList">
              <el-option label="近7天" value="7d" />
              <el-option label="近30天" value="30d" />
              <el-option label="近90天" value="90d" />
            </el-select>
          </div>
          <div class="trend-chart">
            <el-empty description="风险趋势图表" :image-size="200" />
            <!-- 实际项目中这里会集成ECharts图表 -->
          </div>
        </el-card>
      </div>

      <el-table :data="riskList" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="riskType" label="风险类型" width="120">
          <template slot-scope="scope">
            {{ getRiskTypeText(scope.row.riskType) }}
          </template>
        </el-table-column>
        <el-table-column prop="riskLevel" label="风险等级" width="100">
          <template slot-scope="scope">
            <el-tag :type="getRiskLevelType(scope.row.riskLevel)">
              {{ getRiskLevelText(scope.row.riskLevel) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="riskName" label="风险名称" />
        <el-table-column prop="description" label="风险描述" show-overflow-tooltip />
        <el-table-column prop="occurTime" label="发生时间" width="150" />
        <el-table-column prop="status" label="处理状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-show="total > 0"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="风险类型" prop="riskType">
          <el-select v-model="form.riskType" placeholder="请选择风险类型">
            <el-option label="交易风险" value="transaction" />
            <el-option label="运输风险" value="transport" />
            <el-option label="资金风险" value="finance" />
            <el-option label="合规风险" value="compliance" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级" prop="riskLevel">
          <el-select v-model="form.riskLevel" placeholder="请选择风险等级">
            <el-option label="低风险" value="low" />
            <el-option label="中风险" value="medium" />
            <el-option label="高风险" value="high" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险名称" prop="riskName">
          <el-input v-model="form.riskName" placeholder="请输入风险名称" />
        </el-form-item>
        <el-form-item label="风险描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入风险描述" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="发生时间" prop="occurTime">
          <el-date-picker v-model="form.occurTime" type="datetime" placeholder="选择发生时间" value-format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="处理状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择处理状态">
            <el-option label="未处理" value="pending" />
            <el-option label="处理中" value="processing" />
            <el-option label="已处理" value="completed" />
            <el-option label="已关闭" value="closed" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理措施" prop="treatment">
          <el-input v-model="form.treatment" placeholder="请输入处理措施" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog title="风险事件详情" :visible.sync="viewDialogVisible" width="800px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="风险类型">{{ getRiskTypeText(viewForm.riskType) }}</el-descriptions-item>
        <el-descriptions-item label="风险等级">{{ getRiskLevelText(viewForm.riskLevel) }}</el-descriptions-item>
        <el-descriptions-item label="风险名称">{{ viewForm.riskName }}</el-descriptions-item>
        <el-descriptions-item label="风险描述">{{ viewForm.description }}</el-descriptions-item>
        <el-descriptions-item label="发生时间">{{ viewForm.occurTime }}</el-descriptions-item>
        <el-descriptions-item label="处理状态">{{ getStatusText(viewForm.status) }}</el-descriptions-item>
        <el-descriptions-item label="处理措施">{{ viewForm.treatment }}</el-descriptions-item>
        <el-descriptions-item label="处理人">{{ viewForm.handler }}</el-descriptions-item>
        <el-descriptions-item label="处理时间">{{ viewForm.processTime }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ viewForm.remark }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RiskMonitor',
  data() {
    return {
      searchForm: {
        riskType: '',
        riskLevel: '',
        status: ''
      },
      riskList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      totalRiskEvents: 156,
      pendingRiskEvents: 23,
      highRiskEvents: 12,
      avgProcessTime: 48.5,
      riskChange: -3.2,
      pendingChange: -5.8,
      highRiskChange: 0,
      processTimeChange: -8.3,
      trendPeriod: '7d',
      dialogVisible: false,
      viewDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        riskType: '',
        riskLevel: '',
        riskName: '',
        description: '',
        occurTime: '',
        status: 'pending',
        treatment: '',
        handler: '',
        processTime: '',
        remark: ''
      },
      viewForm: {
        riskType: '',
        riskLevel: '',
        riskName: '',
        description: '',
        occurTime: '',
        status: '',
        treatment: '',
        handler: '',
        processTime: '',
        remark: ''
      },
      rules: {
        riskType: [{ required: true, message: '请选择风险类型', trigger: 'change' }],
        riskLevel: [{ required: true, message: '请选择风险等级', trigger: 'change' }],
        riskName: [{ required: true, message: '请输入风险名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入风险描述', trigger: 'blur' }],
        occurTime: [{ required: true, message: '请选择发生时间', trigger: 'change' }],
        status: [{ required: true, message: '请选择处理状态', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getRiskList()
  },
  methods: {
    getRiskList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            riskType: 'transaction',
            riskLevel: 'high',
            riskName: '客户信用风险',
            description: '客户历史付款记录异常，存在逾期风险',
            occurTime: '2026-02-10 10:30:00',
            status: 'pending',
            treatment: '',
            handler: '',
            processTime: '',
            remark: ''
          },
          {
            id: 2,
            riskType: 'transport',
            riskLevel: 'medium',
            riskName: '货物延迟风险',
            description: '因天气原因，运输路线可能延迟',
            occurTime: '2026-02-10 08:15:00',
            status: 'processing',
            treatment: '已调整运输路线，预计延迟2小时',
            handler: '张三',
            processTime: '2026-02-10 09:00:00',
            remark: '已通知客户'
          },
          {
            id: 3,
            riskType: 'finance',
            riskLevel: 'low',
            riskName: '发票信息错误',
            description: '客户提供的发票信息有误，需要重新提供',
            occurTime: '2026-02-09 16:45:00',
            status: 'completed',
            treatment: '已联系客户重新提供正确发票信息',
            handler: '李四',
            processTime: '2026-02-09 17:30:00',
            remark: '已解决'
          },
          {
            id: 4,
            riskType: 'compliance',
            riskLevel: 'high',
            riskName: '海关合规风险',
            description: '货物可能涉及海关监管物品，需要进一步申报',
            occurTime: '2026-02-09 14:20:00',
            status: 'processing',
            treatment: '已联系关务部门进行专项申报',
            handler: '王五',
            processTime: '2026-02-09 15:00:00',
            remark: '处理中'
          }
        ],
        total: 4
      }
      this.riskList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getRiskList()
    },
    resetForm() {
      this.searchForm = {
        riskType: '',
        riskLevel: '',
        status: ''
      }
      this.getRiskList()
    },
    handleAdd() {
      this.dialogTitle = '新增风险事件'
      this.form = {
        id: '',
        riskType: '',
        riskLevel: '',
        riskName: '',
        description: '',
        occurTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: 'pending',
        treatment: '',
        handler: '',
        processTime: '',
        remark: ''
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑风险事件'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleView(row) {
      this.viewForm = { ...row }
      this.viewDialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('提交数据:', this.form)
          this.dialogVisible = false
          this.getRiskList()
          this.$message.success('操作成功')
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该风险事件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('删除风险事件:', id)
        this.getRiskList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getRiskList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getRiskList()
    },
    getRiskTypeText(type) {
      const typeMap = {
        transaction: '交易风险',
        transport: '运输风险',
        finance: '资金风险',
        compliance: '合规风险'
      }
      return typeMap[type] || type
    },
    getRiskLevelType(level) {
      switch (level) {
        case 'low':
          return 'success'
        case 'medium':
          return 'warning'
        case 'high':
          return 'danger'
        default:
          return ''
      }
    },
    getRiskLevelText(level) {
      const levelMap = {
        low: '低风险',
        medium: '中风险',
        high: '高风险'
      }
      return levelMap[level] || level
    },
    getStatusType(status) {
      switch (status) {
        case 'pending':
          return 'info'
        case 'processing':
          return 'warning'
        case 'completed':
          return 'success'
        case 'closed':
          return 'danger'
        default:
          return ''
      }
    },
    getStatusText(status) {
      const statusMap = {
        pending: '未处理',
        processing: '处理中',
        completed: '已处理',
        closed: '已关闭'
      }
      return statusMap[status] || status
    }
  }
}
</script>

<style scoped>
.risk-monitor-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.search-form {
  margin-bottom: 0;
}

.stats-container {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  color: #67c23a;
}

.stat-change.positive {
  color: #f56c6c;
}

.risk-trend-container {
  margin-bottom: 20px;
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trend-chart {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>