<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>供应链金融管理</span>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="金融服务" name="service">
          <el-button type="primary" size="small" style="margin-bottom: 15px" @click="handleAdd">
            <i class="el-icon-plus"></i> 新增金融服务
          </el-button>
          <el-table
            v-loading="listLoading"
            :data="financeList"
            style="width: 100%"
            border
          >
            <el-table-column prop="id" label="服务ID" width="80" />
            <el-table-column prop="name" label="服务名称" width="180" />
            <el-table-column prop="type" label="服务类型" width="120" />
            <el-table-column prop="partnerId" label="金融机构" width="150" />
            <el-table-column prop="rate" label="利率(%)" width="100" />
            <el-table-column prop="maxAmount" label="最大额度" width="120" />
            <el-table-column prop="status" label="状态" width="80">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
                  {{ scope.row.status === 'active' ? '启用' : '禁用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)" circle>
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row.id)" circle>
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="listQuery.page"
            :page-size="listQuery.limit"
            :total="total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="margin-top: 20px"
          />
        </el-tab-pane>
        <el-tab-pane label="融资申请" name="application">
          <el-table
            v-loading="appLoading"
            :data="applicationList"
            style="width: 100%"
            border
          >
            <el-table-column prop="id" label="申请ID" width="80" />
            <el-table-column prop="userId" label="申请人" width="120" />
            <el-table-column prop="serviceId" label="服务名称" width="180" />
            <el-table-column prop="amount" label="申请金额" width="120" />
            <el-table-column prop="status" label="状态" width="100">
              <template slot-scope="scope">
                <el-tag :type="getStatusType(scope.row.status)">
                  {{ getStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间" width="180" />
            <el-table-column prop="processTime" label="处理时间" width="180" />
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleProcess(scope.row)" circle>
                  <i class="el-icon-view"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 新增/编辑金融服务对话框 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="服务类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择服务类型">
            <el-option label="物流贷" value="logistics_loan" />
            <el-option label="保理" value="factoring" />
            <el-option label="供应链金融" value="supply_chain_finance" />
            <el-option label="其他金融服务" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="金融机构" prop="partnerId">
          <el-select v-model="form.partnerId" placeholder="请选择金融机构">
            <el-option v-for="partner in partners" :key="partner.id" :label="partner.name" :value="partner.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="利率(%)" prop="rate">
          <el-input-number v-model="form.rate" :min="0" :step="0.01" placeholder="请输入利率" />
        </el-form-item>
        <el-form-item label="最大额度" prop="maxAmount">
          <el-input-number v-model="form.maxAmount" :min="0" :step="1000" placeholder="请输入最大额度" />
        </el-form-item>
        <el-form-item label="服务描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入服务描述" :rows="3" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" active-value="active" inactive-value="inactive" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 融资申请处理对话框 -->
    <el-dialog :title="'处理融资申请'" :visible.sync="processDialog.visible" width="500px">
      <el-form :model="processForm" :rules="processRules" ref="processForm">
        <el-form-item label="申请ID">
          <el-input v-model="processForm.id" disabled />
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="processForm.userId" disabled />
        </el-form-item>
        <el-form-item label="服务名称">
          <el-input v-model="processForm.serviceId" disabled />
        </el-form-item>
        <el-form-item label="申请金额">
          <el-input v-model="processForm.amount" disabled />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input v-model="processForm.applyTime" disabled />
        </el-form-item>
        <el-form-item label="处理结果" prop="status">
          <el-select v-model="processForm.status" placeholder="请选择处理结果">
            <el-option label="通过" value="approved" />
            <el-option label="拒绝" value="rejected" />
            <el-option label="待审核" value="pending" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理意见" prop="comment">
          <el-input type="textarea" v-model="processForm.comment" placeholder="请输入处理意见" :rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="processDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleProcessSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EcoFinance',
  data() {
    return {
      activeTab: 'service',
      listLoading: false,
      appLoading: false,
      financeList: [],
      applicationList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialog: {
        visible: false,
        title: ''
      },
      processDialog: {
        visible: false
      },
      form: {
        id: '',
        name: '',
        type: '',
        partnerId: '',
        rate: 0,
        maxAmount: 0,
        description: '',
        status: 'active'
      },
      processForm: {
        id: '',
        userId: '',
        serviceId: '',
        amount: 0,
        status: '',
        applyTime: '',
        comment: ''
      },
      rules: {
        name: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
        partnerId: [{ required: true, message: '请选择金融机构', trigger: 'change' }],
        rate: [{ required: true, message: '请输入利率', trigger: 'blur' }],
        maxAmount: [{ required: true, message: '请输入最大额度', trigger: 'blur' }]
      },
      processRules: {
        status: [{ required: true, message: '请选择处理结果', trigger: 'change' }],
        comment: [{ required: true, message: '请输入处理意见', trigger: 'blur' }]
      },
      partners: [
        { id: 1, name: '中国银行' },
        { id: 2, name: '建设银行' },
        { id: 3, name: '工商银行' }
      ]
    }
  },
  created() {
    this.getFinanceList()
    this.getApplicationList()
  },
  methods: {
    getFinanceList() {
      this.listLoading = true
      // 模拟API请求
      setTimeout(() => {
        this.financeList = [
          { id: 1, name: '物流贷', type: 'logistics_loan', partnerId: '中国银行', rate: 4.5, maxAmount: 1000000, status: 'active', createTime: '2026-02-01 10:00:00' },
          { id: 2, name: '保理服务', type: 'factoring', partnerId: '建设银行', rate: 5.2, maxAmount: 5000000, status: 'active', createTime: '2026-02-02 11:00:00' },
          { id: 3, name: '供应链金融', type: 'supply_chain_finance', partnerId: '工商银行', rate: 4.8, maxAmount: 10000000, status: 'inactive', createTime: '2026-02-03 12:00:00' }
        ]
        this.total = 3
        this.listLoading = false
      }, 500)
    },
    getApplicationList() {
      this.appLoading = true
      // 模拟API请求
      setTimeout(() => {
        this.applicationList = [
          { id: 1, userId: 'user1', serviceId: '物流贷', amount: 500000, status: 'pending', applyTime: '2026-02-10 09:00:00', processTime: '' },
          { id: 2, userId: 'user2', serviceId: '保理服务', amount: 1000000, status: 'approved', applyTime: '2026-02-09 10:00:00', processTime: '2026-02-09 11:00:00' },
          { id: 3, userId: 'user3', serviceId: '供应链金融', amount: 2000000, status: 'rejected', applyTime: '2026-02-08 12:00:00', processTime: '2026-02-08 14:00:00' }
        ]
        this.appLoading = false
      }, 500)
    },
    handleAdd() {
      this.dialog.title = '新增金融服务'
      this.dialog.visible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = {
          id: '',
          name: '',
          type: '',
          partnerId: '',
          rate: 0,
          maxAmount: 0,
          description: '',
          status: 'active'
        }
      })
    },
    handleEdit(row) {
      this.dialog.title = '编辑金融服务'
      this.dialog.visible = true
      this.$nextTick(() => {
        this.form = { ...row }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该金融服务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API请求
        setTimeout(() => {
          this.$message.success('删除成功')
          this.getFinanceList()
        }, 500)
      })
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API请求
          setTimeout(() => {
            this.$message.success(this.form.id ? '编辑成功' : '新增成功')
            this.dialog.visible = false
            this.getFinanceList()
          }, 500)
        }
      })
    },
    handleProcess(row) {
      this.processDialog.visible = true
      this.$nextTick(() => {
        this.processForm = { ...row }
      })
    },
    handleProcessSubmit() {
      this.$refs.processForm.validate((valid) => {
        if (valid) {
          // 模拟API请求
          setTimeout(() => {
            this.$message.success('处理成功')
            this.processDialog.visible = false
            this.getApplicationList()
          }, 500)
        }
      })
    },
    handleSizeChange(size) {
      this.listQuery.limit = size
      this.getFinanceList()
    },
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getFinanceList()
    },
    getStatusType(status) {
      const typeMap = {
        approved: 'success',
        rejected: 'danger',
        pending: 'warning'
      }
      return typeMap[status] || 'info'
    },
    getStatusText(status) {
      const textMap = {
        approved: '通过',
        rejected: '拒绝',
        pending: '待审核'
      }
      return textMap[status] || status
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>