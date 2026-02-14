<template>
  <div class="credit-customer-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.name" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="信用等级">
          <el-select v-model="searchForm.creditLevel" placeholder="请选择信用等级" clearable>
            <el-option label="AAA" value="AAA" />
            <el-option label="AA" value="AA" />
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="账期">
          <el-select v-model="searchForm.paymentTerm" placeholder="请选择账期" clearable>
            <el-option label="15天" value="15" />
            <el-option label="30天" value="30" />
            <el-option label="45天" value="45" />
            <el-option label="现款" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleEvaluate">批量评估</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <el-table :data="customerList" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="contactName" label="联系人" width="100" />
        <el-table-column prop="contactPhone" label="联系电话" width="150" />
        <el-table-column prop="creditLevel" label="信用等级" width="100">
          <template slot-scope="scope">
            <el-tag :type="getCreditLevelType(scope.row.creditLevel)">
              {{ scope.row.creditLevel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="paymentTerm" label="账期" width="100">
          <template slot-scope="scope">
            {{ scope.row.paymentTerm === 0 ? '现款' : scope.row.paymentTerm + '天' }}
          </template>
        </el-table-column>
        <el-table-column prop="creditScore" label="信用分数" width="100" />
        <el-table-column prop="lastEvaluateDate" label="最后评估日期" width="150" />
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" @click="handleEvaluateSingle(scope.row)">评估</el-button>
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

    <!-- 查看对话框 -->
    <el-dialog title="客户信用详情" :visible.sync="viewDialogVisible" width="800px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="客户名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ viewForm.contactName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ viewForm.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="信用等级">{{ viewForm.creditLevel }}</el-descriptions-item>
        <el-descriptions-item label="信用分数">{{ viewForm.creditScore }}</el-descriptions-item>
        <el-descriptions-item label="账期">{{ viewForm.paymentTerm === 0 ? '现款' : viewForm.paymentTerm + '天' }}</el-descriptions-item>
        <el-descriptions-item label="最后评估日期">{{ viewForm.lastEvaluateDate }}</el-descriptions-item>
        <el-descriptions-item label="评估维度">
          <el-table :data="viewForm.evaluationDimensions" style="width: 100%" size="small">
            <el-table-column prop="dimension" label="维度" width="120" />
            <el-table-column prop="score" label="得分" width="80" />
            <el-table-column prop="weight" label="权重" width="80" />
            <el-table-column prop="contribution" label="贡献值" width="100" />
          </el-table>
        </el-descriptions-item>
        <el-descriptions-item label="交易记录">
          <el-table :data="viewForm.transactionRecords" style="width: 100%" size="small">
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="amount" label="金额" width="100" />
            <el-table-column prop="status" label="状态" width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'completed' ? 'success' : 'warning'">{{ scope.row.status === 'completed' ? '已完成' : '进行中' }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 评估对话框 -->
    <el-dialog title="客户信用评估" :visible.sync="evaluateDialogVisible" width="800px">
      <el-form :model="evaluateForm" :rules="evaluateRules" ref="evaluateForm" label-width="100px">
        <el-form-item label="客户名称">
          <el-input v-model="evaluateForm.name" readonly />
        </el-form-item>
        <el-form-item label="评估日期">
          <el-date-picker v-model="evaluateForm.evaluateDate" type="date" placeholder="选择评估日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="评估维度">
          <el-table :data="evaluateForm.evaluationDimensions" style="width: 100%" border>
            <el-table-column prop="dimension" label="维度" width="120" />
            <el-table-column prop="score" label="得分" width="100">
              <template slot-scope="scope">
                <el-slider v-model="scope.row.score" :min="0" :max="100" />
              </template>
            </el-table-column>
            <el-table-column prop="weight" label="权重" width="100">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.weight" :min="0" :max="1" :step="0.01" />
              </template>
            </el-table-column>
            <el-table-column prop="contribution" label="贡献值" width="100">
              <template slot-scope="scope">
                {{ (scope.row.score * scope.row.weight).toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="综合得分">
          <el-input v-model="evaluateForm.creditScore" readonly />
        </el-form-item>
        <el-form-item label="信用等级" prop="creditLevel">
          <el-select v-model="evaluateForm.creditLevel" placeholder="请选择信用等级">
            <el-option label="AAA" value="AAA" />
            <el-option label="AA" value="AA" />
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="账期" prop="paymentTerm">
          <el-select v-model="evaluateForm.paymentTerm" placeholder="请选择账期">
            <el-option label="现款" value="0" />
            <el-option label="15天" value="15" />
            <el-option label="30天" value="30" />
            <el-option label="45天" value="45" />
          </el-select>
        </el-form-item>
        <el-form-item label="评估备注">
          <el-input v-model="evaluateForm.remark" type="textarea" rows="3" placeholder="请输入评估备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="evaluateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEvaluateSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreditCustomer',
  data() {
    return {
      searchForm: {
        name: '',
        creditLevel: '',
        paymentTerm: ''
      },
      customerList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      viewDialogVisible: false,
      evaluateDialogVisible: false,
      viewForm: {
        name: '',
        contactName: '',
        contactPhone: '',
        creditLevel: '',
        creditScore: '',
        paymentTerm: '',
        lastEvaluateDate: '',
        evaluationDimensions: [],
        transactionRecords: []
      },
      evaluateForm: {
        id: '',
        name: '',
        evaluateDate: '',
        creditScore: '',
        creditLevel: '',
        paymentTerm: '',
        remark: '',
        evaluationDimensions: [
          { dimension: '工商信息', score: 90, weight: 0.2, contribution: 18 },
          { dimension: '交易记录', score: 85, weight: 0.3, contribution: 25.5 },
          { dimension: '财务数据', score: 80, weight: 0.2, contribution: 16 },
          { dimension: '全网信用', score: 95, weight: 0.15, contribution: 14.25 },
          { dimension: '投诉记录', score: 100, weight: 0.15, contribution: 15 }
        ]
      },
      evaluateRules: {
        evaluateDate: [{ required: true, message: '请选择评估日期', trigger: 'change' }],
        creditLevel: [{ required: true, message: '请选择信用等级', trigger: 'change' }],
        paymentTerm: [{ required: true, message: '请选择账期', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getCustomerList()
  },
  methods: {
    getCustomerList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            name: '北京鸿驰祥瑞物流有限公司',
            contactName: '张三',
            contactPhone: '13800138000',
            creditLevel: 'AAA',
            paymentTerm: 45,
            creditScore: 95,
            lastEvaluateDate: '2026-01-31'
          },
          {
            id: 2,
            name: '上海发货企业有限公司',
            contactName: '李四',
            contactPhone: '13900139000',
            creditLevel: 'AA',
            paymentTerm: 30,
            creditScore: 85,
            lastEvaluateDate: '2026-01-31'
          }
        ],
        total: 2
      }
      this.customerList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getCustomerList()
    },
    resetForm() {
      this.searchForm = {
        name: '',
        creditLevel: '',
        paymentTerm: ''
      }
      this.getCustomerList()
    },
    handleView(row) {
      // 模拟获取详细数据
      this.viewForm = {
        ...row,
        evaluationDimensions: [
          { dimension: '工商信息', score: 90, weight: 0.2, contribution: 18 },
          { dimension: '交易记录', score: 85, weight: 0.3, contribution: 25.5 },
          { dimension: '财务数据', score: 80, weight: 0.2, contribution: 16 },
          { dimension: '全网信用', score: 95, weight: 0.15, contribution: 14.25 },
          { dimension: '投诉记录', score: 100, weight: 0.15, contribution: 15 }
        ],
        transactionRecords: [
          { date: '2026-01-15', amount: 100000, status: 'completed' },
          { date: '2026-01-20', amount: 50000, status: 'completed' },
          { date: '2026-02-01', amount: 80000, status: 'completed' }
        ]
      }
      this.viewDialogVisible = true
    },
    handleEvaluateSingle(row) {
      this.evaluateForm = {
        id: row.id,
        name: row.name,
        evaluateDate: new Date().toISOString().split('T')[0],
        creditScore: row.creditScore,
        creditLevel: row.creditLevel,
        paymentTerm: row.paymentTerm,
        remark: '',
        evaluationDimensions: [
          { dimension: '工商信息', score: 90, weight: 0.2, contribution: 18 },
          { dimension: '交易记录', score: 85, weight: 0.3, contribution: 25.5 },
          { dimension: '财务数据', score: 80, weight: 0.2, contribution: 16 },
          { dimension: '全网信用', score: 95, weight: 0.15, contribution: 14.25 },
          { dimension: '投诉记录', score: 100, weight: 0.15, contribution: 15 }
        ]
      }
      this.evaluateDialogVisible = true
    },
    handleEvaluate() {
      this.$message.success('批量评估功能开发中')
    },
    handleEvaluateSubmit() {
      this.calculateCreditScore()
      this.$refs.evaluateForm.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('提交评估数据:', this.evaluateForm)
          this.evaluateDialogVisible = false
          this.getCustomerList()
          this.$message.success('评估成功')
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该客户信用记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('删除客户信用记录:', id)
        this.getCustomerList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getCustomerList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getCustomerList()
    },
    getCreditLevelType(level) {
      switch (level) {
        case 'AAA':
          return 'success'
        case 'AA':
          return 'primary'
        case 'A':
          return 'info'
        case 'B':
          return 'warning'
        case 'C':
          return 'danger'
        default:
          return ''
      }
    },
    calculateCreditScore() {
      let totalScore = 0
      this.evaluateForm.evaluationDimensions.forEach(item => {
        item.contribution = item.score * item.weight
        totalScore += item.contribution
      })
      this.evaluateForm.creditScore = totalScore.toFixed(2)
    }
  },
  watch: {
    'evaluateForm.evaluationDimensions': {
      handler() {
        this.calculateCreditScore()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.credit-customer-container {
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