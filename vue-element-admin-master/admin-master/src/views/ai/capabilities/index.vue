<template>
  <div class="ai-capabilities-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="能力名称">
          <el-input v-model="searchForm.name" placeholder="请输入能力名称" clearable />
        </el-form-item>
        <el-form-item label="能力类型">
          <el-select v-model="searchForm.type" placeholder="请选择能力类型" clearable>
            <el-option label="信息识别" value="information_recognition" />
            <el-option label="价格测算" value="price_calculation" />
            <el-option label="需求预测" value="demand_prediction" />
            <el-option label="智能调度" value="intelligent_scheduling" />
            <el-option label="异常预警" value="anomaly_warning" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增能力</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <el-table :data="capabilitiesList" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="能力名称" />
        <el-table-column prop="type" label="能力类型" width="120">
          <template slot-scope="scope">
            {{ getTypeText(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="能力描述" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'danger'">
              {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="callCount" label="调用次数" width="100" />
        <el-table-column prop="lastCallTime" label="最后调用时间" width="150" />
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" :type="scope.row.status === 'enabled' ? 'warning' : 'success'" @click="handleToggleStatus(scope.row)">
              {{ scope.row.status === 'enabled' ? '禁用' : '启用' }}
            </el-button>
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
        <el-form-item label="能力名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入能力名称" />
        </el-form-item>
        <el-form-item label="能力类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择能力类型">
            <el-option label="信息识别" value="information_recognition" />
            <el-option label="价格测算" value="price_calculation" />
            <el-option label="需求预测" value="demand_prediction" />
            <el-option label="智能调度" value="intelligent_scheduling" />
            <el-option label="异常预警" value="anomaly_warning" />
          </el-select>
        </el-form-item>
        <el-form-item label="能力描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入能力描述" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="API地址" prop="apiUrl">
          <el-input v-model="form.apiUrl" placeholder="请输入API地址" />
        </el-form-item>
        <el-form-item label="调用参数" prop="parameters">
          <el-input v-model="form.parameters" placeholder="请输入调用参数" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog title="能力详情" :visible.sync="viewDialogVisible" width="800px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="能力名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="能力类型">{{ getTypeText(viewForm.type) }}</el-descriptions-item>
        <el-descriptions-item label="能力描述">{{ viewForm.description }}</el-descriptions-item>
        <el-descriptions-item label="API地址">{{ viewForm.apiUrl }}</el-descriptions-item>
        <el-descriptions-item label="调用参数">{{ viewForm.parameters }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ viewForm.status === 'enabled' ? '启用' : '禁用' }}</el-descriptions-item>
        <el-descriptions-item label="调用次数">{{ viewForm.callCount }}</el-descriptions-item>
        <el-descriptions-item label="最后调用时间">{{ viewForm.lastCallTime }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ viewForm.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ viewForm.updateTime }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AICapabilities',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        status: ''
      },
      capabilitiesList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      viewDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        name: '',
        type: '',
        description: '',
        apiUrl: '',
        parameters: '',
        status: 'enabled'
      },
      viewForm: {
        name: '',
        type: '',
        description: '',
        apiUrl: '',
        parameters: '',
        status: '',
        callCount: '',
        lastCallTime: '',
        createTime: '',
        updateTime: ''
      },
      rules: {
        name: [{ required: true, message: '请输入能力名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择能力类型', trigger: 'change' }],
        description: [{ required: true, message: '请输入能力描述', trigger: 'blur' }],
        apiUrl: [{ required: true, message: '请输入API地址', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getCapabilitiesList()
  },
  methods: {
    getCapabilitiesList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            name: '智能信息识别',
            type: 'information_recognition',
            description: '自动识别工商信息、驾驶证、行驶证等证件信息',
            apiUrl: 'https://api.example.com/ai/information_recognition',
            parameters: '{"image_url": "string", "type": "string"}',
            status: 'enabled',
            callCount: 1250,
            lastCallTime: '2026-02-10 15:30:00',
            createTime: '2026-01-01 00:00:00',
            updateTime: '2026-02-01 00:00:00'
          },
          {
            id: 2,
            name: '智能价格测算',
            type: 'price_calculation',
            description: '根据货物信息、路线、淡旺季自动测算运费',
            apiUrl: 'https://api.example.com/ai/price_calculation',
            parameters: '{"origin": "string", "destination": "string", "weight": number, "volume": number}',
            status: 'enabled',
            callCount: 890,
            lastCallTime: '2026-02-10 14:20:00',
            createTime: '2026-01-01 00:00:00',
            updateTime: '2026-02-01 00:00:00'
          },
          {
            id: 3,
            name: '智能需求预测',
            type: 'demand_prediction',
            description: '基于历史数据预测未来物流需求',
            apiUrl: 'https://api.example.com/ai/demand_prediction',
            parameters: '{"customer_id": "string", "period": "string"}',
            status: 'enabled',
            callCount: 450,
            lastCallTime: '2026-02-10 10:15:00',
            createTime: '2026-01-01 00:00:00',
            updateTime: '2026-02-01 00:00:00'
          },
          {
            id: 4,
            name: '智能调度',
            type: 'intelligent_scheduling',
            description: '基于实时数据智能调度车辆和司机',
            apiUrl: 'https://api.example.com/ai/intelligent_scheduling',
            parameters: '{"order_id": "string", "time_window": "string"}',
            status: 'enabled',
            callCount: 670,
            lastCallTime: '2026-02-10 09:45:00',
            createTime: '2026-01-01 00:00:00',
            updateTime: '2026-02-01 00:00:00'
          },
          {
            id: 5,
            name: '异常预警',
            type: 'anomaly_warning',
            description: '实时监测运输过程中的异常情况并预警',
            apiUrl: 'https://api.example.com/ai/anomaly_warning',
            parameters: '{"waybill_id": "string", "threshold": number}',
            status: 'enabled',
            callCount: 920,
            lastCallTime: '2026-02-10 08:30:00',
            createTime: '2026-01-01 00:00:00',
            updateTime: '2026-02-01 00:00:00'
          }
        ],
        total: 5
      }
      this.capabilitiesList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getCapabilitiesList()
    },
    resetForm() {
      this.searchForm = {
        name: '',
        type: '',
        status: ''
      }
      this.getCapabilitiesList()
    },
    handleAdd() {
      this.dialogTitle = '新增智能能力'
      this.form = {
        id: '',
        name: '',
        type: '',
        description: '',
        apiUrl: '',
        parameters: '',
        status: 'enabled'
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑智能能力'
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
          this.getCapabilitiesList()
          this.$message.success('操作成功')
        }
      })
    },
    handleToggleStatus(row) {
      const newStatus = row.status === 'enabled' ? 'disabled' : 'enabled'
      this.$confirm(`确定要${newStatus === 'enabled' ? '启用' : '禁用'}该智能能力吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('切换状态:', row.id, newStatus)
        this.getCapabilitiesList()
        this.$message.success('操作成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getCapabilitiesList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getCapabilitiesList()
    },
    getTypeText(type) {
      const typeMap = {
        information_recognition: '信息识别',
        price_calculation: '价格测算',
        demand_prediction: '需求预测',
        intelligent_scheduling: '智能调度',
        anomaly_warning: '异常预警'
      }
      return typeMap[type] || type
    }
  }
}
</script>

<style scoped>
.ai-capabilities-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.search-form {
  margin-bottom: 0;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>