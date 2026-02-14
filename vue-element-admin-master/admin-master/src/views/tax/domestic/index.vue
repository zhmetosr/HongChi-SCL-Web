<template>
  <div class="tax-domestic-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="税务期间">
          <el-date-picker
            v-model="searchForm.period"
            type="month"
            placeholder="选择月份"
            format="yyyy-MM"
            value-format="yyyy-MM"
            clearable
          />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="未申报" value="unreported" />
            <el-option label="已申报" value="reported" />
            <el-option label="已缴纳" value="paid" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增税务记录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <el-table :data="taxList" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="period" label="税务期间" width="120" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="invoiceAmount" label="开票金额" width="120" />
        <el-table-column prop="taxRate" label="税率" width="80">
          <template slot-scope="scope">
            {{ scope.row.taxRate * 100 }}%
          </template>
        </el-table-column>
        <el-table-column prop="taxAmount" label="税额" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="700px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="税务期间" prop="period">
          <el-date-picker
            v-model="form.period"
            type="month"
            placeholder="选择月份"
            format="yyyy-MM"
            value-format="yyyy-MM"
          />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="开票金额" prop="invoiceAmount">
          <el-input v-model="form.invoiceAmount" placeholder="请输入开票金额" type="number" />
        </el-form-item>
        <el-form-item label="税率" prop="taxRate">
          <el-select v-model="form.taxRate" placeholder="请选择税率">
            <el-option label="3%" value="0.03" />
            <el-option label="6%" value="0.06" />
            <el-option label="9%" value="0.09" />
            <el-option label="13%" value="0.13" />
          </el-select>
        </el-form-item>
        <el-form-item label="税额" prop="taxAmount">
          <el-input v-model="form.taxAmount" placeholder="自动计算" type="number" readonly />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="未申报" value="unreported" />
            <el-option label="已申报" value="reported" />
            <el-option label="已缴纳" value="paid" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DomesticTax',
  data() {
    return {
      searchForm: {
        period: '',
        customerName: '',
        status: ''
      },
      taxList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        period: '',
        customerName: '',
        invoiceAmount: '',
        taxRate: '0.13',
        taxAmount: '',
        status: 'unreported'
      },
      rules: {
        period: [{ required: true, message: '请选择税务期间', trigger: 'change' }],
        customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        invoiceAmount: [{ required: true, message: '请输入开票金额', trigger: 'blur' }],
        taxRate: [{ required: true, message: '请选择税率', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getTaxList()
  },
  methods: {
    getTaxList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            period: '2026-01',
            customerName: '北京鸿驰祥瑞物流有限公司',
            invoiceAmount: 100000,
            taxRate: 0.06,
            taxAmount: 6000,
            status: 'reported'
          },
          {
            id: 2,
            period: '2026-01',
            customerName: '上海发货企业有限公司',
            invoiceAmount: 50000,
            taxRate: 0.06,
            taxAmount: 3000,
            status: 'unreported'
          }
        ],
        total: 2
      }
      this.taxList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getTaxList()
    },
    resetForm() {
      this.searchForm = {
        period: '',
        customerName: '',
        status: ''
      }
      this.getTaxList()
    },
    handleAdd() {
      this.dialogTitle = '新增税务记录'
      this.form = {
        id: '',
        period: '',
        customerName: '',
        invoiceAmount: '',
        taxRate: '0.13',
        taxAmount: '',
        status: 'unreported'
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑税务记录'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.form.taxAmount = this.form.invoiceAmount * this.form.taxRate
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('提交数据:', this.form)
          this.dialogVisible = false
          this.getTaxList()
          this.$message.success('操作成功')
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该税务记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('删除税务记录:', id)
        this.getTaxList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getTaxList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getTaxList()
    },
    getStatusType(status) {
      switch (status) {
        case 'unreported':
          return 'warning'
        case 'reported':
          return 'info'
        case 'paid':
          return 'success'
        default:
          return ''
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'unreported':
          return '未申报'
        case 'reported':
          return '已申报'
        case 'paid':
          return '已缴纳'
        default:
          return ''
      }
    }
  },
  watch: {
    'form.invoiceAmount': function(val) {
      if (val && this.form.taxRate) {
        this.form.taxAmount = val * this.form.taxRate
      }
    },
    'form.taxRate': function(val) {
      if (val && this.form.invoiceAmount) {
        this.form.taxAmount = this.form.invoiceAmount * val
      }
    }
  }
}
</script>

<style scoped>
.tax-domestic-container {
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