<template>
  <div class="credit-supplier">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>供应商信用管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增供应商信用
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="供应商名称">
          <el-input v-model="searchForm.name" placeholder="请输入供应商名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商类型">
          <el-select v-model="searchForm.type" placeholder="请选择供应商类型" clearable>
            <el-option label="物流专线" value="line"></el-option>
            <el-option label="仓储服务" value="warehouse"></el-option>
            <el-option label="其他服务" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信用等级">
          <el-select v-model="searchForm.creditLevel" placeholder="请选择信用等级" clearable>
            <el-option label="S级" value="S"></el-option>
            <el-option label="A级" value="A"></el-option>
            <el-option label="B级" value="B"></el-option>
            <el-option label="C级" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="supplierList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="供应商名称" width="180"></el-table-column>
        <el-table-column prop="type" label="供应商类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'line'">物流专线</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'warehouse'">仓储服务</el-tag>
            <el-tag type="info" v-else>其他服务</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="creditScore" label="信用评分" width="100"></el-table-column>
        <el-table-column prop="creditLevel" label="信用等级" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.creditLevel === 'S'" type="danger">S级</el-tag>
            <el-tag type="success" v-else-if="scope.row.creditLevel === 'A'">A级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.creditLevel === 'B'">B级</el-tag>
            <el-tag type="info" v-else>C级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="paymentTerm" label="账期" width="100">
          <template slot-scope="scope">
            {{ scope.row.paymentTerm }}天
          </template>
        </el-table-column>
        <el-table-column prop="evaluationDate" label="评估日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'active'" type="success">正常</el-tag>
            <el-tag type="danger" v-else>异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button type="success" size="small" @click="handleEvaluate(scope.row)">评估</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
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
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="供应商类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择供应商类型">
            <el-option label="物流专线" value="line"></el-option>
            <el-option label="仓储服务" value="warehouse"></el-option>
            <el-option label="其他服务" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信用评分" prop="creditScore">
          <el-input v-model.number="form.creditScore" type="number" placeholder="请输入信用评分"></el-input>
        </el-form-item>
        <el-form-item label="信用等级" prop="creditLevel">
          <el-select v-model="form.creditLevel" placeholder="请选择信用等级">
            <el-option label="S级" value="S"></el-option>
            <el-option label="A级" value="A"></el-option>
            <el-option label="B级" value="B"></el-option>
            <el-option label="C级" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账期" prop="paymentTerm">
          <el-input v-model.number="form.paymentTerm" type="number" placeholder="请输入账期（天）"></el-input>
        </el-form-item>
        <el-form-item label="评估日期" prop="evaluationDate">
          <el-date-picker v-model="form.evaluationDate" type="date" placeholder="选择评估日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" active-value="active" inactive-value="inactive"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
    
    <!-- 查看对话框 -->
    <el-dialog
      title="供应商信用详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="供应商名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="供应商类型">
          <el-tag v-if="viewForm.type === 'line'">物流专线</el-tag>
          <el-tag type="success" v-else-if="viewForm.type === 'warehouse'">仓储服务</el-tag>
          <el-tag type="info" v-else>其他服务</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="信用评分">{{ viewForm.creditScore }}</el-descriptions-item>
        <el-descriptions-item label="信用等级">
          <el-tag v-if="viewForm.creditLevel === 'S'" type="danger">S级</el-tag>
          <el-tag type="success" v-else-if="viewForm.creditLevel === 'A'">A级</el-tag>
          <el-tag type="warning" v-else-if="viewForm.creditLevel === 'B'">B级</el-tag>
          <el-tag type="info" v-else>C级</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="账期">{{ viewForm.paymentTerm }}天</el-descriptions-item>
        <el-descriptions-item label="评估日期">{{ viewForm.evaluationDate }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'active'" type="success">正常</el-tag>
          <el-tag type="danger" v-else>异常</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">{{ viewForm.remarks || '-' }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    
    <!-- 评估对话框 -->
    <el-dialog
      title="评估供应商信用"
      :visible.sync="evaluateDialogVisible"
      width="600px"
    >
      <el-form :model="evaluateForm" :rules="evaluateRules" ref="evaluateForm">
        <el-form-item label="交易记录" prop="transactionRecord">
          <el-slider v-model="evaluateForm.transactionRecord" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.transactionRecord }}分</div>
        </el-form-item>
        <el-form-item label="服务质量" prop="serviceQuality">
          <el-slider v-model="evaluateForm.serviceQuality" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.serviceQuality }}分</div>
        </el-form-item>
        <el-form-item label="货损率" prop="damageRate">
          <el-slider v-model="evaluateForm.damageRate" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.damageRate }}分</div>
        </el-form-item>
        <el-form-item label="投诉记录" prop="complaintRecord">
          <el-slider v-model="evaluateForm.complaintRecord" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.complaintRecord }}分</div>
        </el-form-item>
        <el-form-item label="评估日期" prop="evaluationDate">
          <el-date-picker v-model="evaluateForm.evaluationDate" type="date" placeholder="选择评估日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="评估备注" prop="remarks">
          <el-input v-model="evaluateForm.remarks" type="textarea" placeholder="请输入评估备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="evaluateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEvaluateSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreditSupplier',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        creditLevel: ''
      },
      supplierList: [
        {
          id: 1,
          name: '北京物流专线',
          type: 'line',
          creditScore: 95,
          creditLevel: 'S',
          paymentTerm: 45,
          evaluationDate: '2024-01-01',
          status: 'active',
          remarks: '优质供应商'
        },
        {
          id: 2,
          name: '上海仓储服务',
          type: 'warehouse',
          creditScore: 85,
          creditLevel: 'A',
          paymentTerm: 30,
          evaluationDate: '2024-01-02',
          status: 'active',
          remarks: '良好供应商'
        },
        {
          id: 3,
          name: '广州物流专线',
          type: 'line',
          creditScore: 75,
          creditLevel: 'B',
          paymentTerm: 15,
          evaluationDate: '2024-01-03',
          status: 'active',
          remarks: '一般供应商'
        },
        {
          id: 4,
          name: '深圳其他服务',
          type: 'other',
          creditScore: 65,
          creditLevel: 'C',
          paymentTerm: 0,
          evaluationDate: '2024-01-04',
          status: 'inactive',
          remarks: '需谨慎合作'
        },
        {
          id: 5,
          name: '杭州物流专线',
          type: 'line',
          creditScore: 90,
          creditLevel: 'A',
          paymentTerm: 30,
          evaluationDate: '2024-01-05',
          status: 'active',
          remarks: '优质供应商'
        }
      ],
      total: 5,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      viewDialogVisible: false,
      evaluateDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        name: '',
        type: '',
        creditScore: 0,
        creditLevel: 'B',
        paymentTerm: 30,
        evaluationDate: '',
        status: 'active',
        remarks: ''
      },
      viewForm: {
        id: '',
        name: '',
        type: '',
        creditScore: 0,
        creditLevel: 'B',
        paymentTerm: 30,
        evaluationDate: '',
        status: 'active',
        remarks: ''
      },
      evaluateForm: {
        transactionRecord: 80,
        serviceQuality: 80,
        damageRate: 80,
        complaintRecord: 80,
        evaluationDate: '',
        remarks: '',
        supplierId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择供应商类型', trigger: 'change' }],
        creditScore: [{ required: true, message: '请输入信用评分', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        creditLevel: [{ required: true, message: '请选择信用等级', trigger: 'change' }],
        paymentTerm: [{ required: true, message: '请输入账期', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        evaluationDate: [{ required: true, message: '请选择评估日期', trigger: 'change' }]
      },
      evaluateRules: {
        transactionRecord: [{ required: true, message: '请输入交易记录评分', trigger: 'blur' }],
        serviceQuality: [{ required: true, message: '请输入服务质量评分', trigger: 'blur' }],
        damageRate: [{ required: true, message: '请输入货损率评分', trigger: 'blur' }],
        complaintRecord: [{ required: true, message: '请输入投诉记录评分', trigger: 'blur' }],
        evaluationDate: [{ required: true, message: '请选择评估日期', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSearch() {
      // 模拟搜索功能
      this.$message.success('搜索功能已触发');
    },
    resetForm() {
      this.searchForm = {
        name: '',
        type: '',
        creditLevel: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增供应商信用';
      this.form = {
        id: '',
        name: '',
        type: '',
        creditScore: 0,
        creditLevel: 'B',
        paymentTerm: 30,
        evaluationDate: '',
        status: 'active',
        remarks: ''
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    handleEvaluate(row) {
      this.evaluateForm = {
        transactionRecord: 80,
        serviceQuality: 80,
        damageRate: 80,
        complaintRecord: 80,
        evaluationDate: '',
        remarks: '',
        supplierId: row.id
      };
      this.evaluateDialogVisible = true;
    },
    handleEvaluateSubmit() {
      this.$refs.evaluateForm.validate((valid) => {
        if (valid) {
          // 计算信用评分
          const totalScore = (this.evaluateForm.transactionRecord + this.evaluateForm.serviceQuality + this.evaluateForm.damageRate + this.evaluateForm.complaintRecord) / 4;
          let creditLevel = 'B';
          let paymentTerm = 30;
          
          if (totalScore >= 90) {
            creditLevel = 'S';
            paymentTerm = 45;
          } else if (totalScore >= 80) {
            creditLevel = 'A';
            paymentTerm = 30;
          } else if (totalScore >= 70) {
            creditLevel = 'B';
            paymentTerm = 15;
          } else {
            creditLevel = 'C';
            paymentTerm = 0;
          }
          
          // 更新供应商信用信息
          const supplier = this.supplierList.find(item => item.id === this.evaluateForm.supplierId);
          if (supplier) {
            supplier.creditScore = Math.round(totalScore);
            supplier.creditLevel = creditLevel;
            supplier.paymentTerm = paymentTerm;
            supplier.evaluationDate = this.evaluateForm.evaluationDate;
            supplier.remarks = this.evaluateForm.remarks;
            supplier.status = totalScore >= 70 ? 'active' : 'inactive';
          }
          
          this.$message.success('评估成功');
          this.evaluateDialogVisible = false;
        } else {
          return false;
        }
      });
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个供应商信用信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.supplierList = this.supplierList.filter(item => item.id !== id);
        this.total = this.supplierList.length;
        this.$message.success('删除成功');
      }).catch(() => {
        this.$message.info('取消删除');
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑操作
            const index = this.supplierList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.supplierList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newSupplier = {
              ...this.form,
              id: this.supplierList.length + 1
            };
            this.supplierList.push(newSupplier);
            this.total = this.supplierList.length;
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
.credit-supplier {
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

.slider-value {
  text-align: center;
  margin-top: 5px;
  color: #606266;
}
</style>