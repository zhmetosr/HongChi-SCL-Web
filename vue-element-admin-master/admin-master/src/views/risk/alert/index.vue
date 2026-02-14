<template>
  <div class="risk-alert">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>风险预警管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增预警
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="预警名称">
          <el-input v-model="searchForm.name" placeholder="请输入预警名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="预警类型">
          <el-select v-model="searchForm.type" placeholder="请选择预警类型" clearable>
            <el-option label="交易风险" value="transaction"></el-option>
            <el-option label="运输风险" value="transport"></el-option>
            <el-option label="资金风险" value="finance"></el-option>
            <el-option label="合规风险" value="compliance"></el-option>
            <el-option label="其他风险" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级">
          <el-select v-model="searchForm.level" placeholder="请选择风险等级" clearable>
            <el-option label="低风险" value="low"></el-option>
            <el-option label="中风险" value="medium"></el-option>
            <el-option label="高风险" value="high"></el-option>
            <el-option label="极高风险" value="critical"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="未处理" value="pending"></el-option>
            <el-option label="处理中" value="processing"></el-option>
            <el-option label="已处理" value="processed"></el-option>
            <el-option label="已忽略" value="ignored"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="alertList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="预警名称" width="200"></el-table-column>
        <el-table-column prop="type" label="预警类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'transaction'">交易风险</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'transport'">运输风险</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'finance'">资金风险</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type === 'compliance'">合规风险</el-tag>
            <el-tag type="info" v-else>其他风险</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="风险等级" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 'low'" type="info">低风险</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === 'medium'">中风险</el-tag>
            <el-tag type="danger" v-else-if="scope.row.level === 'high'">高风险</el-tag>
            <el-tag type="danger" size="large" v-else>极高风险</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="预警描述"></el-table-column>
        <el-table-column prop="alertDate" label="预警日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'pending'" type="info">未处理</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 'processing'">处理中</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 'processed'">已处理</el-tag>
            <el-tag type="danger" v-else>已忽略</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button type="success" size="small" @click="handleProcess(scope.row)">处理</el-button>
            <el-button type="danger" size="small" @click="handleIgnore(scope.row.id)">忽略</el-button>
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
        <el-form-item label="预警名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入预警名称"></el-input>
        </el-form-item>
        <el-form-item label="预警类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择预警类型">
            <el-option label="交易风险" value="transaction"></el-option>
            <el-option label="运输风险" value="transport"></el-option>
            <el-option label="资金风险" value="finance"></el-option>
            <el-option label="合规风险" value="compliance"></el-option>
            <el-option label="其他风险" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级" prop="level">
          <el-select v-model="form.level" placeholder="请选择风险等级">
            <el-option label="低风险" value="low"></el-option>
            <el-option label="中风险" value="medium"></el-option>
            <el-option label="高风险" value="high"></el-option>
            <el-option label="极高风险" value="critical"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入预警描述"></el-input>
        </el-form-item>
        <el-form-item label="预警日期" prop="alertDate">
          <el-date-picker v-model="form.alertDate" type="date" placeholder="选择预警日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="未处理" value="pending"></el-option>
            <el-option label="处理中" value="processing"></el-option>
            <el-option label="已处理" value="processed"></el-option>
            <el-option label="已忽略" value="ignored"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
    
    <!-- 查看对话框 -->
    <el-dialog
      title="风险预警详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="预警名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="预警类型">
          <el-tag v-if="viewForm.type === 'transaction'">交易风险</el-tag>
          <el-tag type="success" v-else-if="viewForm.type === 'transport'">运输风险</el-tag>
          <el-tag type="warning" v-else-if="viewForm.type === 'finance'">资金风险</el-tag>
          <el-tag type="danger" v-else-if="viewForm.type === 'compliance'">合规风险</el-tag>
          <el-tag type="info" v-else>其他风险</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="风险等级">
          <el-tag v-if="viewForm.level === 'low'" type="info">低风险</el-tag>
          <el-tag type="warning" v-else-if="viewForm.level === 'medium'">中风险</el-tag>
          <el-tag type="danger" v-else-if="viewForm.level === 'high'">高风险</el-tag>
          <el-tag type="danger" size="large" v-else>极高风险</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'pending'" type="info">未处理</el-tag>
          <el-tag type="warning" v-else-if="viewForm.status === 'processing'">处理中</el-tag>
          <el-tag type="success" v-else-if="viewForm.status === 'processed'">已处理</el-tag>
          <el-tag type="danger" v-else>已忽略</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="预警日期">{{ viewForm.alertDate }}</el-descriptions-item>
        <el-descriptions-item label="处理日期">{{ viewForm.processDate || '-' }}</el-descriptions-item>
        <el-descriptions-item label="预警描述" :span="2">{{ viewForm.description }}</el-descriptions-item>
        <el-descriptions-item label="处理记录" :span="2">
          <el-timeline v-if="viewForm.processRecords && viewForm.processRecords.length > 0">
            <el-timeline-item 
              v-for="(record, index) in viewForm.processRecords" 
              :key="index"
              :timestamp="record.date"
              :type="record.type"
              :size="'small'"
            >
              {{ record.content }}
            </el-timeline-item>
          </el-timeline>
          <p v-else>-</p>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    
    <!-- 处理对话框 -->
    <el-dialog
      title="处理风险预警"
      :visible.sync="processDialogVisible"
      width="600px"
    >
      <el-form :model="processForm" :rules="processRules" ref="processForm">
        <el-form-item label="处理内容" prop="content">
          <el-input v-model="processForm.content" type="textarea" placeholder="请输入处理内容"></el-input>
        </el-form-item>
        <el-form-item label="处理结果" prop="result">
          <el-select v-model="processForm.result" placeholder="请选择处理结果">
            <el-option label="已解决" value="resolved"></el-option>
            <el-option label="部分解决" value="partially_resolved"></el-option>
            <el-option label="无法解决" value="unresolved"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理日期" prop="date">
          <el-date-picker v-model="processForm.date" type="date" placeholder="选择处理日期" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="processDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleProcessSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RiskAlert',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        level: '',
        status: ''
      },
      alertList: [
        {
          id: 1,
          name: '客户信用等级下降',
          type: 'finance',
          level: 'medium',
          description: '客户信用等级从A级下降到B级，可能存在回款风险',
          alertDate: '2024-01-01',
          status: 'pending',
          processDate: '',
          processRecords: []
        },
        {
          id: 2,
          name: '运输延迟风险',
          type: 'transport',
          level: 'low',
          description: '预计运输时间可能延迟1-2天，建议提前通知客户',
          alertDate: '2024-01-02',
          status: 'processing',
          processDate: '',
          processRecords: [
            {
              date: '2024-01-02',
              content: '已通知客户运输可能延迟',
              type: 'primary'
            }
          ]
        },
        {
          id: 3,
          name: '合规风险预警',
          type: 'compliance',
          level: 'high',
          description: '货物可能涉及海关监管风险，建议加强合规检查',
          alertDate: '2024-01-03',
          status: 'processed',
          processDate: '2024-01-03',
          processRecords: [
            {
              date: '2024-01-03',
              content: '已进行合规检查，确认货物符合要求',
              type: 'success'
            }
          ]
        },
        {
          id: 4,
          name: '资金流动性风险',
          type: 'finance',
          level: 'high',
          description: '公司资金流动性紧张，可能影响正常运营',
          alertDate: '2024-01-04',
          status: 'pending',
          processDate: '',
          processRecords: []
        },
        {
          id: 5,
          name: '供应商违约风险',
          type: 'transaction',
          level: 'medium',
          description: '供应商最近多次延迟交货，可能存在违约风险',
          alertDate: '2024-01-05',
          status: 'ignored',
          processDate: '2024-01-05',
          processRecords: [
            {
              date: '2024-01-05',
              content: '已与供应商沟通，确认问题已解决',
              type: 'info'
            }
          ]
        }
      ],
      total: 5,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      viewDialogVisible: false,
      processDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        name: '',
        type: '',
        level: '',
        description: '',
        alertDate: '',
        status: 'pending'
      },
      viewForm: {
        id: '',
        name: '',
        type: '',
        level: '',
        description: '',
        alertDate: '',
        status: 'pending',
        processDate: '',
        processRecords: []
      },
      processForm: {
        content: '',
        result: '',
        date: '',
        alertId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入预警名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择预警类型', trigger: 'change' }],
        level: [{ required: true, message: '请选择风险等级', trigger: 'change' }],
        description: [{ required: true, message: '请输入预警描述', trigger: 'blur' }],
        alertDate: [{ required: true, message: '请选择预警日期', trigger: 'change' }]
      },
      processRules: {
        content: [{ required: true, message: '请输入处理内容', trigger: 'blur' }],
        result: [{ required: true, message: '请选择处理结果', trigger: 'change' }],
        date: [{ required: true, message: '请选择处理日期', trigger: 'change' }]
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
        level: '',
        status: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增风险预警';
      this.form = {
        id: '',
        name: '',
        type: '',
        level: '',
        description: '',
        alertDate: '',
        status: 'pending'
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    handleProcess(row) {
      this.processForm = {
        content: '',
        result: '',
        date: '',
        alertId: row.id
      };
      this.processDialogVisible = true;
    },
    handleProcessSubmit() {
      this.$refs.processForm.validate((valid) => {
        if (valid) {
          const alert = this.alertList.find(item => item.id === this.processForm.alertId);
          if (alert) {
            // 添加处理记录
            const processRecord = {
              date: this.processForm.date,
              content: this.processForm.content,
              type: this.processForm.result === 'resolved' ? 'success' : 'primary'
            };
            if (!alert.processRecords) {
              alert.processRecords = [];
            }
            alert.processRecords.push(processRecord);
            
            // 更新状态
            alert.status = 'processed';
            alert.processDate = this.processForm.date;
            
            this.$message.success('处理成功');
            this.processDialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    handleIgnore(id) {
      this.$confirm('确定要忽略这个风险预警吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟忽略操作
        const alert = this.alertList.find(item => item.id === id);
        if (alert) {
          alert.status = 'ignored';
        }
        this.$message.success('忽略成功');
      }).catch(() => {
        this.$message.info('取消忽略');
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑操作
            const index = this.alertList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.alertList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newAlert = {
              ...this.form,
              id: this.alertList.length + 1,
              processRecords: []
            };
            this.alertList.push(newAlert);
            this.total = this.alertList.length;
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
.risk-alert {
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