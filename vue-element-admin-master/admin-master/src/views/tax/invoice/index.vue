<template>
  <div class="tax-invoice">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>税务发票管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增发票
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="发票号码">
          <el-input v-model="searchForm.invoiceNumber" placeholder="请输入发票号码" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-select v-model="searchForm.type" placeholder="请选择发票类型" clearable>
            <el-option label="增值税专用发票" value="special"></el-option>
            <el-option label="增值税普通发票" value="normal"></el-option>
            <el-option label="电子发票" value="electronic"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="已开具" value="issued"></el-option>
            <el-option label="已作废" value="cancelled"></el-option>
            <el-option label="已红冲" value="redden"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="invoiceList" style="width: 100%">
        <el-table-column prop="invoiceNumber" label="发票号码" width="180"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="180"></el-table-column>
        <el-table-column prop="type" label="发票类型" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'special'">增值税专用发票</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'normal'">增值税普通发票</el-tag>
            <el-tag type="info" v-else>电子发票</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="120">
          <template slot-scope="scope">
            ¥{{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="taxAmount" label="税额" width="120">
          <template slot-scope="scope">
            ¥{{ scope.row.taxAmount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="价税合计" width="120">
          <template slot-scope="scope">
            ¥{{ scope.row.totalAmount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="issueDate" label="开具日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'issued'" type="success">已开具</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 'cancelled'">已作废</el-tag>
            <el-tag type="warning" v-else>已红冲</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button type="danger" size="small" @click="handleCancel(scope.row.id)" v-if="scope.row.status === 'issued'">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="发票号码" prop="invoiceNumber">
          <el-input v-model="form.invoiceNumber" placeholder="请输入发票号码"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="发票类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择发票类型">
            <el-option label="增值税专用发票" value="special"></el-option>
            <el-option label="增值税普通发票" value="normal"></el-option>
            <el-option label="电子发票" value="electronic"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model.number="form.amount" type="number" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="taxRate">
          <el-input v-model.number="form.taxRate" type="number" placeholder="请输入税率"></el-input>
        </el-form-item>
        <el-form-item label="税额" prop="taxAmount">
          <el-input v-model.number="form.taxAmount" type="number" placeholder="请输入税额" readonly></el-input>
        </el-form-item>
        <el-form-item label="价税合计" prop="totalAmount">
          <el-input v-model.number="form.totalAmount" type="number" placeholder="请输入价税合计" readonly></el-input>
        </el-form-item>
        <el-form-item label="开具日期" prop="issueDate">
          <el-date-picker v-model="form.issueDate" type="date" placeholder="选择开具日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
    
    <!-- 查看对话框 -->
    <el-dialog
      title="发票详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="发票号码">{{ viewForm.invoiceNumber }}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ viewForm.customerName }}</el-descriptions-item>
        <el-descriptions-item label="发票类型">
          <el-tag v-if="viewForm.type === 'special'">增值税专用发票</el-tag>
          <el-tag type="success" v-else-if="viewForm.type === 'normal'">增值税普通发票</el-tag>
          <el-tag type="info" v-else>电子发票</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'issued'" type="success">已开具</el-tag>
          <el-tag type="danger" v-else-if="viewForm.status === 'cancelled'">已作废</el-tag>
          <el-tag type="warning" v-else>已红冲</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="金额">¥{{ viewForm.amount.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="税率">{{ viewForm.taxRate }}%</el-descriptions-item>
        <el-descriptions-item label="税额">¥{{ viewForm.taxAmount.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="价税合计">¥{{ viewForm.totalAmount.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="开具日期">{{ viewForm.issueDate }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ viewForm.remarks || '-' }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TaxInvoice',
  data() {
    return {
      searchForm: {
        invoiceNumber: '',
        customerName: '',
        type: '',
        status: ''
      },
      invoiceList: [
        {
          id: 1,
          invoiceNumber: '00123456',
          customerName: '北京测试公司',
          type: 'special',
          amount: 10000.00,
          taxRate: 13,
          taxAmount: 1300.00,
          totalAmount: 11300.00,
          issueDate: '2024-01-01',
          status: 'issued',
          remarks: '测试发票'
        },
        {
          id: 2,
          invoiceNumber: '00123457',
          customerName: '上海测试公司',
          type: 'normal',
          amount: 5000.00,
          taxRate: 13,
          taxAmount: 650.00,
          totalAmount: 5650.00,
          issueDate: '2024-01-02',
          status: 'issued',
          remarks: '测试发票'
        },
        {
          id: 3,
          invoiceNumber: '00123458',
          customerName: '广州测试公司',
          type: 'electronic',
          amount: 8000.00,
          taxRate: 13,
          taxAmount: 1040.00,
          totalAmount: 9040.00,
          issueDate: '2024-01-03',
          status: 'issued',
          remarks: '测试发票'
        },
        {
          id: 4,
          invoiceNumber: '00123459',
          customerName: '深圳测试公司',
          type: 'special',
          amount: 12000.00,
          taxRate: 13,
          taxAmount: 1560.00,
          totalAmount: 13560.00,
          issueDate: '2024-01-04',
          status: 'cancelled',
          remarks: '测试发票'
        },
        {
          id: 5,
          invoiceNumber: '00123460',
          customerName: '杭州测试公司',
          type: 'normal',
          amount: 6000.00,
          taxRate: 13,
          taxAmount: 780.00,
          totalAmount: 6780.00,
          issueDate: '2024-01-05',
          status: 'redden',
          remarks: '测试发票'
        }
      ],
      total: 5,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      viewDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        invoiceNumber: '',
        customerName: '',
        type: '',
        amount: 0,
        taxRate: 13,
        taxAmount: 0,
        totalAmount: 0,
        issueDate: '',
        status: 'issued',
        remarks: ''
      },
      viewForm: {
        id: '',
        invoiceNumber: '',
        customerName: '',
        type: '',
        amount: 0,
        taxRate: 13,
        taxAmount: 0,
        totalAmount: 0,
        issueDate: '',
        status: 'issued',
        remarks: ''
      },
      rules: {
        invoiceNumber: [{ required: true, message: '请输入发票号码', trigger: 'blur' }],
        customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        taxRate: [{ required: true, message: '请输入税率', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        issueDate: [{ required: true, message: '请选择开具日期', trigger: 'change' }]
      }
    }
  },
  watch: {
    'form.amount': function(newVal) {
      this.calculateTax();
    },
    'form.taxRate': function(newVal) {
      this.calculateTax();
    }
  },
  methods: {
    calculateTax() {
      this.form.taxAmount = (this.form.amount * this.form.taxRate / 100).toFixed(2) * 1;
      this.form.totalAmount = (this.form.amount + this.form.taxAmount).toFixed(2) * 1;
    },
    handleSearch() {
      // 模拟搜索功能
      this.$message.success('搜索功能已触发');
    },
    resetForm() {
      this.searchForm = {
        invoiceNumber: '',
        customerName: '',
        type: '',
        status: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增发票';
      this.form = {
        id: '',
        invoiceNumber: '',
        customerName: '',
        type: '',
        amount: 0,
        taxRate: 13,
        taxAmount: 0,
        totalAmount: 0,
        issueDate: '',
        status: 'issued',
        remarks: ''
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    handleCancel(id) {
      this.$confirm('确定要作废这个发票吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟作废操作
        const index = this.invoiceList.findIndex(item => item.id === id);
        if (index !== -1) {
          this.invoiceList[index].status = 'cancelled';
        }
        this.$message.success('作废成功');
      }).catch(() => {
        this.$message.info('取消作废');
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑操作
            const index = this.invoiceList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.invoiceList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newInvoice = {
              ...this.form,
              id: this.invoiceList.length + 1
            };
            this.invoiceList.push(newInvoice);
            this.total = this.invoiceList.length;
            this.$message.success('新增成功');
          }
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
.tax-invoice {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-form {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>