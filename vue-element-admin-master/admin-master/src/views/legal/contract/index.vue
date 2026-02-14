<template>
  <div class="legal-contract-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="合同编号">
          <el-input v-model="searchForm.code" placeholder="请输入合同编号" clearable />
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input v-model="searchForm.name" placeholder="请输入合同名称" clearable />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="草稿" value="draft" />
            <el-option label="待签署" value="pending" />
            <el-option label="已签署" value="signed" />
            <el-option label="已过期" value="expired" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增合同</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <el-table :data="contractList" style="width: 100%" border>
        <el-table-column prop="code" label="合同编号" width="150" />
        <el-table-column prop="name" label="合同名称" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="amount" label="合同金额" width="120" />
        <el-table-column prop="startDate" label="开始日期" width="120" />
        <el-table-column prop="endDate" label="结束日期" width="120" />
        <el-table-column prop="status" label="状态" width="100">
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
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="合同编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="合同名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入合同名称" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="合同金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入合同金额" type="number" />
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker v-model="form.endDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="合同内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入合同内容" type="textarea" rows="4" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="草稿" value="draft" />
            <el-option label="待签署" value="pending" />
            <el-option label="已签署" value="signed" />
            <el-option label="已过期" value="expired" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.content" label="风险识别">
          <el-alert
            :title="'合同风险识别结果'"
            :type="riskAlertType"
            :closable="false"
            show-icon
          >
            <div v-if="riskItems.length > 0">
              <div v-for="(item, index) in riskItems" :key="index" class="risk-item">
                <span class="risk-level" :class="item.level">{{ item.level === 'high' ? '高风险' : item.level === 'medium' ? '中风险' : '低风险' }}</span>
                <span class="risk-content">{{ item.content }}</span>
              </div>
            </div>
            <div v-else class="no-risk">未发现明显风险条款</div>
          </el-alert>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog title="合同详情" :visible.sync="viewDialogVisible" width="800px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="合同编号">{{ viewForm.code }}</el-descriptions-item>
        <el-descriptions-item label="合同名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ viewForm.customerName }}</el-descriptions-item>
        <el-descriptions-item label="合同金额">{{ viewForm.amount }}</el-descriptions-item>
        <el-descriptions-item label="开始日期">{{ viewForm.startDate }}</el-descriptions-item>
        <el-descriptions-item label="结束日期">{{ viewForm.endDate }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ getStatusText(viewForm.status) }}</el-descriptions-item>
        <el-descriptions-item label="合同内容">{{ viewForm.content }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LegalContract',
  data() {
    return {
      searchForm: {
        code: '',
        name: '',
        customerName: '',
        status: ''
      },
      contractList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      viewDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        code: '',
        name: '',
        customerName: '',
        amount: '',
        startDate: '',
        endDate: '',
        content: '',
        status: 'draft'
      },
      viewForm: {
        code: '',
        name: '',
        customerName: '',
        amount: '',
        startDate: '',
        endDate: '',
        content: '',
        status: ''
      },
      rules: {
        code: [{ required: true, message: '请输入合同编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入合同名称', trigger: 'blur' }],
        customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      riskItems: [],
      riskAlertType: 'success'
    }
  },
  created() {
    this.getContractList()
  },
  methods: {
    getContractList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            code: 'CT001',
            name: '物流服务合同',
            customerName: '北京鸿驰祥瑞物流有限公司',
            amount: 100000,
            startDate: '2026-01-01',
            endDate: '2026-12-31',
            content: '甲方委托乙方提供物流运输服务，乙方应按照甲方要求及时、安全地完成货物运输任务。',
            status: 'signed'
          },
          {
            id: 2,
            code: 'CT002',
            name: '仓储服务合同',
            customerName: '上海发货企业有限公司',
            amount: 50000,
            startDate: '2026-01-01',
            endDate: '2026-06-30',
            content: '甲方委托乙方提供仓储服务，乙方应确保仓库安全，做好货物保管工作。',
            status: 'pending'
          }
        ],
        total: 2
      }
      this.contractList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getContractList()
    },
    resetForm() {
      this.searchForm = {
        code: '',
        name: '',
        customerName: '',
        status: ''
      }
      this.getContractList()
    },
    handleAdd() {
      this.dialogTitle = '新增合同'
      this.form = {
        id: '',
        code: '',
        name: '',
        customerName: '',
        amount: '',
        startDate: '',
        endDate: '',
        content: '',
        status: 'draft'
      }
      this.riskItems = []
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑合同'
      this.form = { ...row }
      this.analyzeRisk()
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
          this.getContractList()
          this.$message.success('操作成功')
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该合同吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('删除合同:', id)
        this.getContractList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getContractList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getContractList()
    },
    getStatusType(status) {
      switch (status) {
        case 'draft':
          return 'info'
        case 'pending':
          return 'warning'
        case 'signed':
          return 'success'
        case 'expired':
          return 'danger'
        default:
          return ''
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'draft':
          return '草稿'
        case 'pending':
          return '待签署'
        case 'signed':
          return '已签署'
        case 'expired':
          return '已过期'
        default:
          return ''
      }
    },
    analyzeRisk() {
      // 模拟合同风险识别
      this.riskItems = []
      if (this.form.content) {
        if (this.form.content.includes('违约责任')) {
          this.riskItems.push({
            level: 'medium',
            content: '合同包含违约责任条款，建议仔细审查'
          })
        }
        if (this.form.content.includes('争议解决')) {
          this.riskItems.push({
            level: 'low',
            content: '合同包含争议解决条款，符合法律要求'
          })
        }
        if (!this.form.content.includes('保密条款')) {
          this.riskItems.push({
            level: 'high',
            content: '合同缺少保密条款，建议添加'
          })
        }
      }
      this.riskAlertType = this.riskItems.some(item => item.level === 'high') ? 'error' : this.riskItems.length > 0 ? 'warning' : 'success'
    }
  },
  watch: {
    'form.content': function() {
      this.analyzeRisk()
    }
  }
}
</script>

<style scoped>
.legal-contract-container {
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

.risk-item {
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #f0f0f0;
}

.risk-level {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 12px;
}

.risk-level.high {
  background-color: #fde2e2;
  color: #f56c6c;
}

.risk-level.medium {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.risk-level.low {
  background-color: #ecf5ff;
  color: #409eff;
}

.no-risk {
  color: #67c23a;
  font-size: 14px;
}
</style>