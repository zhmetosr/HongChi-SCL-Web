<template>
  <div class="credit-driver">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>司机信用管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增司机信用
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="司机姓名">
          <el-input v-model="searchForm.name" placeholder="请输入司机姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="驾驶证号">
          <el-input v-model="searchForm.licenseNumber" placeholder="请输入驾驶证号" clearable></el-input>
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
      
      <el-table :data="driverList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="司机姓名" width="120"></el-table-column>
        <el-table-column prop="licenseNumber" label="驾驶证号" width="180"></el-table-column>
        <el-table-column prop="creditScore" label="信用评分" width="100"></el-table-column>
        <el-table-column prop="creditLevel" label="信用等级" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.creditLevel === 'S'" type="danger">S级</el-tag>
            <el-tag type="success" v-else-if="scope.row.creditLevel === 'A'">A级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.creditLevel === 'B'">B级</el-tag>
            <el-tag type="info" v-else>C级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="incidentCount" label="事故次数" width="100"></el-table-column>
        <el-table-column prop="complaintCount" label="投诉次数" width="100"></el-table-column>
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
        <el-form-item label="司机姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入司机姓名"></el-input>
        </el-form-item>
        <el-form-item label="驾驶证号" prop="licenseNumber">
          <el-input v-model="form.licenseNumber" placeholder="请输入驾驶证号"></el-input>
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
        <el-form-item label="事故次数" prop="incidentCount">
          <el-input v-model.number="form.incidentCount" type="number" placeholder="请输入事故次数"></el-input>
        </el-form-item>
        <el-form-item label="投诉次数" prop="complaintCount">
          <el-input v-model.number="form.complaintCount" type="number" placeholder="请输入投诉次数"></el-input>
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
      title="司机信用详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="司机姓名">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="驾驶证号">{{ viewForm.licenseNumber }}</el-descriptions-item>
        <el-descriptions-item label="信用评分">{{ viewForm.creditScore }}</el-descriptions-item>
        <el-descriptions-item label="信用等级">
          <el-tag v-if="viewForm.creditLevel === 'S'" type="danger">S级</el-tag>
          <el-tag type="success" v-else-if="viewForm.creditLevel === 'A'">A级</el-tag>
          <el-tag type="warning" v-else-if="viewForm.creditLevel === 'B'">B级</el-tag>
          <el-tag type="info" v-else>C级</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="事故次数">{{ viewForm.incidentCount }}</el-descriptions-item>
        <el-descriptions-item label="投诉次数">{{ viewForm.complaintCount }}</el-descriptions-item>
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
      title="评估司机信用"
      :visible.sync="evaluateDialogVisible"
      width="600px"
    >
      <el-form :model="evaluateForm" :rules="evaluateRules" ref="evaluateForm">
        <el-form-item label="服务质量" prop="serviceQuality">
          <el-slider v-model="evaluateForm.serviceQuality" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.serviceQuality }}分</div>
        </el-form-item>
        <el-form-item label="安全驾驶" prop="safeDriving">
          <el-slider v-model="evaluateForm.safeDriving" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.safeDriving }}分</div>
        </el-form-item>
        <el-form-item label="准时率" prop="onTimeRate">
          <el-slider v-model="evaluateForm.onTimeRate" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.onTimeRate }}分</div>
        </el-form-item>
        <el-form-item label="投诉记录" prop="complaintRecord">
          <el-slider v-model="evaluateForm.complaintRecord" :min="0" :max="100" :step="1"></el-slider>
          <div class="slider-value">{{ evaluateForm.complaintRecord }}分</div>
        </el-form-item>
        <el-form-item label="事故次数" prop="incidentCount">
          <el-input v-model.number="evaluateForm.incidentCount" type="number" placeholder="请输入事故次数"></el-input>
        </el-form-item>
        <el-form-item label="投诉次数" prop="complaintCount">
          <el-input v-model.number="evaluateForm.complaintCount" type="number" placeholder="请输入投诉次数"></el-input>
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
  name: 'CreditDriver',
  data() {
    return {
      searchForm: {
        name: '',
        licenseNumber: '',
        creditLevel: ''
      },
      driverList: [
        {
          id: 1,
          name: '张三',
          licenseNumber: '110101199001011234',
          creditScore: 95,
          creditLevel: 'S',
          incidentCount: 0,
          complaintCount: 0,
          evaluationDate: '2024-01-01',
          status: 'active',
          remarks: '优秀司机'
        },
        {
          id: 2,
          name: '李四',
          licenseNumber: '110101199002022345',
          creditScore: 85,
          creditLevel: 'A',
          incidentCount: 1,
          complaintCount: 0,
          evaluationDate: '2024-01-02',
          status: 'active',
          remarks: '良好司机'
        },
        {
          id: 3,
          name: '王五',
          licenseNumber: '110101199003033456',
          creditScore: 75,
          creditLevel: 'B',
          incidentCount: 1,
          complaintCount: 1,
          evaluationDate: '2024-01-03',
          status: 'active',
          remarks: '一般司机'
        },
        {
          id: 4,
          name: '赵六',
          licenseNumber: '110101199004044567',
          creditScore: 65,
          creditLevel: 'C',
          incidentCount: 2,
          complaintCount: 2,
          evaluationDate: '2024-01-04',
          status: 'inactive',
          remarks: '需谨慎使用'
        },
        {
          id: 5,
          name: '孙七',
          licenseNumber: '110101199005055678',
          creditScore: 90,
          creditLevel: 'A',
          incidentCount: 0,
          complaintCount: 0,
          evaluationDate: '2024-01-05',
          status: 'active',
          remarks: '优秀司机'
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
        licenseNumber: '',
        creditScore: 0,
        creditLevel: 'B',
        incidentCount: 0,
        complaintCount: 0,
        evaluationDate: '',
        status: 'active',
        remarks: ''
      },
      viewForm: {
        id: '',
        name: '',
        licenseNumber: '',
        creditScore: 0,
        creditLevel: 'B',
        incidentCount: 0,
        complaintCount: 0,
        evaluationDate: '',
        status: 'active',
        remarks: ''
      },
      evaluateForm: {
        serviceQuality: 80,
        safeDriving: 80,
        onTimeRate: 80,
        complaintRecord: 80,
        incidentCount: 0,
        complaintCount: 0,
        evaluationDate: '',
        remarks: '',
        driverId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入司机姓名', trigger: 'blur' }],
        licenseNumber: [{ required: true, message: '请输入驾驶证号', trigger: 'blur' }],
        creditScore: [{ required: true, message: '请输入信用评分', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        creditLevel: [{ required: true, message: '请选择信用等级', trigger: 'change' }],
        incidentCount: [{ required: true, message: '请输入事故次数', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        complaintCount: [{ required: true, message: '请输入投诉次数', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        evaluationDate: [{ required: true, message: '请选择评估日期', trigger: 'change' }]
      },
      evaluateRules: {
        serviceQuality: [{ required: true, message: '请输入服务质量评分', trigger: 'blur' }],
        safeDriving: [{ required: true, message: '请输入安全驾驶评分', trigger: 'blur' }],
        onTimeRate: [{ required: true, message: '请输入准时率评分', trigger: 'blur' }],
        complaintRecord: [{ required: true, message: '请输入投诉记录评分', trigger: 'blur' }],
        incidentCount: [{ required: true, message: '请输入事故次数', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        complaintCount: [{ required: true, message: '请输入投诉次数', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
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
        licenseNumber: '',
        creditLevel: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增司机信用';
      this.form = {
        id: '',
        name: '',
        licenseNumber: '',
        creditScore: 0,
        creditLevel: 'B',
        incidentCount: 0,
        complaintCount: 0,
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
        serviceQuality: 80,
        safeDriving: 80,
        onTimeRate: 80,
        complaintRecord: 80,
        incidentCount: row.incidentCount,
        complaintCount: row.complaintCount,
        evaluationDate: '',
        remarks: '',
        driverId: row.id
      };
      this.evaluateDialogVisible = true;
    },
    handleEvaluateSubmit() {
      this.$refs.evaluateForm.validate((valid) => {
        if (valid) {
          // 计算信用评分
          const totalScore = (this.evaluateForm.serviceQuality + this.evaluateForm.safeDriving + this.evaluateForm.onTimeRate + this.evaluateForm.complaintRecord) / 4;
          let creditLevel = 'B';
          
          if (totalScore >= 90) {
            creditLevel = 'S';
          } else if (totalScore >= 80) {
            creditLevel = 'A';
          } else if (totalScore >= 70) {
            creditLevel = 'B';
          } else {
            creditLevel = 'C';
          }
          
          // 更新司机信用信息
          const driver = this.driverList.find(item => item.id === this.evaluateForm.driverId);
          if (driver) {
            driver.creditScore = Math.round(totalScore);
            driver.creditLevel = creditLevel;
            driver.incidentCount = this.evaluateForm.incidentCount;
            driver.complaintCount = this.evaluateForm.complaintCount;
            driver.evaluationDate = this.evaluateForm.evaluationDate;
            driver.remarks = this.evaluateForm.remarks;
            driver.status = totalScore >= 70 ? 'active' : 'inactive';
          }
          
          this.$message.success('评估成功');
          this.evaluateDialogVisible = false;
        } else {
          return false;
        }
      });
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个司机信用信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.driverList = this.driverList.filter(item => item.id !== id);
        this.total = this.driverList.length;
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
            const index = this.driverList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.driverList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newDriver = {
              ...this.form,
              id: this.driverList.length + 1
            };
            this.driverList.push(newDriver);
            this.total = this.driverList.length;
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
.credit-driver {
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