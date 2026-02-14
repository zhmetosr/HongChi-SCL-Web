<template>
  <div class="legal-dispute">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>纠纷管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增纠纷
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="纠纷编号">
          <el-input v-model="searchForm.code" placeholder="请输入纠纷编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="纠纷类型">
          <el-select v-model="searchForm.type" placeholder="请选择纠纷类型" clearable>
            <el-option label="货损纠纷" value="damage"></el-option>
            <el-option label="延迟纠纷" value="delay"></el-option>
            <el-option label="费用纠纷" value="fee"></el-option>
            <el-option label="其他纠纷" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="待处理" value="pending"></el-option>
            <el-option label="处理中" value="processing"></el-option>
            <el-option label="已解决" value="resolved"></el-option>
            <el-option label="已关闭" value="closed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="disputeList" style="width: 100%">
        <el-table-column prop="code" label="纠纷编号" width="150"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="180"></el-table-column>
        <el-table-column prop="type" label="纠纷类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'damage'">货损纠纷</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'delay'">延迟纠纷</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type === 'fee'">费用纠纷</el-tag>
            <el-tag type="info" v-else>其他纠纷</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="纠纷金额" width="120">
          <template slot-scope="scope">
            ¥{{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="纠纷描述"></el-table-column>
        <el-table-column prop="submitDate" label="提交日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'pending'" type="info">待处理</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 'processing'">处理中</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 'resolved'">已解决</el-tag>
            <el-tag type="danger" v-else>已关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button type="success" size="small" @click="handleProcess(scope.row)" v-if="scope.row.status === 'pending' || scope.row.status === 'processing'">处理</el-button>
            <el-button type="danger" size="small" @click="handleClose(scope.row.id)" v-if="scope.row.status !== 'closed'">关闭</el-button>
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
        <el-form-item label="纠纷编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入纠纷编号"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="纠纷类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择纠纷类型">
            <el-option label="货损纠纷" value="damage"></el-option>
            <el-option label="延迟纠纷" value="delay"></el-option>
            <el-option label="费用纠纷" value="fee"></el-option>
            <el-option label="其他纠纷" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="纠纷金额" prop="amount">
          <el-input v-model.number="form.amount" type="number" placeholder="请输入纠纷金额"></el-input>
        </el-form-item>
        <el-form-item label="纠纷描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入纠纷描述"></el-input>
        </el-form-item>
        <el-form-item label="提交日期" prop="submitDate">
          <el-date-picker v-model="form.submitDate" type="date" placeholder="选择提交日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待处理" value="pending"></el-option>
            <el-option label="处理中" value="processing"></el-option>
            <el-option label="已解决" value="resolved"></el-option>
            <el-option label="已关闭" value="closed"></el-option>
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
      title="纠纷详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="纠纷编号">{{ viewForm.code }}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ viewForm.customerName }}</el-descriptions-item>
        <el-descriptions-item label="纠纷类型">
          <el-tag v-if="viewForm.type === 'damage'">货损纠纷</el-tag>
          <el-tag type="warning" v-else-if="viewForm.type === 'delay'">延迟纠纷</el-tag>
          <el-tag type="danger" v-else-if="viewForm.type === 'fee'">费用纠纷</el-tag>
          <el-tag type="info" v-else>其他纠纷</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'pending'" type="info">待处理</el-tag>
          <el-tag type="warning" v-else-if="viewForm.status === 'processing'">处理中</el-tag>
          <el-tag type="success" v-else-if="viewForm.status === 'resolved'">已解决</el-tag>
          <el-tag type="danger" v-else>已关闭</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="纠纷金额">¥{{ viewForm.amount.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="提交日期">{{ viewForm.submitDate }}</el-descriptions-item>
        <el-descriptions-item label="纠纷描述" :span="2">{{ viewForm.description }}</el-descriptions-item>
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
      title="处理纠纷"
      :visible.sync="processDialogVisible"
      width="600px"
    >
      <el-form :model="processForm" :rules="processRules" ref="processForm">
        <el-form-item label="处理内容" prop="content">
          <el-input v-model="processForm.content" type="textarea" placeholder="请输入处理内容"></el-input>
        </el-form-item>
        <el-form-item label="处理结果" prop="result">
          <el-select v-model="processForm.result" placeholder="请选择处理结果">
            <el-option label="继续处理" value="continue"></el-option>
            <el-option label="已解决" value="resolved"></el-option>
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
  name: 'LegalDispute',
  data() {
    return {
      searchForm: {
        code: '',
        customerName: '',
        type: '',
        status: ''
      },
      disputeList: [
        {
          id: 1,
          code: 'DIS20240101',
          customerName: '北京测试公司',
          type: 'damage',
          amount: 5000.00,
          description: '货物在运输过程中发生损坏，客户要求赔偿',
          submitDate: '2024-01-01',
          status: 'pending',
          processRecords: []
        },
        {
          id: 2,
          code: 'DIS20240102',
          customerName: '上海测试公司',
          type: 'delay',
          amount: 2000.00,
          description: '货物延迟送达，客户要求赔偿误工费',
          submitDate: '2024-01-02',
          status: 'processing',
          processRecords: [
            {
              date: '2024-01-03',
              content: '已联系客户了解情况',
              type: 'primary'
            }
          ]
        },
        {
          id: 3,
          code: 'DIS20240103',
          customerName: '广州测试公司',
          type: 'fee',
          amount: 1000.00,
          description: '客户对运费计算有异议，认为多收了费用',
          submitDate: '2024-01-03',
          status: 'resolved',
          processRecords: [
            {
              date: '2024-01-04',
              content: '已核实运费计算，确实多收了费用',
              type: 'primary'
            },
            {
              date: '2024-01-05',
              content: '已与客户协商，同意退还多收的费用',
              type: 'success'
            }
          ]
        },
        {
          id: 4,
          code: 'DIS20240104',
          customerName: '深圳测试公司',
          type: 'other',
          amount: 3000.00,
          description: '客户对服务态度不满意，要求赔偿',
          submitDate: '2024-01-04',
          status: 'closed',
          processRecords: [
            {
              date: '2024-01-05',
              content: '已向客户道歉，并提供了优惠券',
              type: 'primary'
            },
            {
              date: '2024-01-06',
              content: '客户接受道歉，纠纷关闭',
              type: 'info'
            }
          ]
        },
        {
          id: 5,
          code: 'DIS20240105',
          customerName: '杭州测试公司',
          type: 'damage',
          amount: 8000.00,
          description: '货物在仓储过程中发生损坏，客户要求赔偿',
          submitDate: '2024-01-05',
          status: 'pending',
          processRecords: []
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
        code: '',
        customerName: '',
        type: '',
        amount: 0,
        description: '',
        submitDate: '',
        status: 'pending',
        processRecords: []
      },
      viewForm: {
        id: '',
        code: '',
        customerName: '',
        type: '',
        amount: 0,
        description: '',
        submitDate: '',
        status: 'pending',
        processRecords: []
      },
      processForm: {
        content: '',
        result: 'continue',
        date: '',
        disputeId: ''
      },
      rules: {
        code: [{ required: true, message: '请输入纠纷编号', trigger: 'blur' }],
        customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择纠纷类型', trigger: 'change' }],
        amount: [{ required: true, message: '请输入纠纷金额', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        description: [{ required: true, message: '请输入纠纷描述', trigger: 'blur' }],
        submitDate: [{ required: true, message: '请选择提交日期', trigger: 'change' }]
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
        code: '',
        customerName: '',
        type: '',
        status: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增纠纷';
      this.form = {
        id: '',
        code: '',
        customerName: '',
        type: '',
        amount: 0,
        description: '',
        submitDate: '',
        status: 'pending',
        processRecords: []
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
        result: 'continue',
        date: '',
        disputeId: row.id
      };
      this.processDialogVisible = true;
    },
    handleProcessSubmit() {
      this.$refs.processForm.validate((valid) => {
        if (valid) {
          const dispute = this.disputeList.find(item => item.id === this.processForm.disputeId);
          if (dispute) {
            // 添加处理记录
            const processRecord = {
              date: this.processForm.date,
              content: this.processForm.content,
              type: this.processForm.result === 'resolved' ? 'success' : 'primary'
            };
            dispute.processRecords.push(processRecord);
            
            // 更新状态
            if (this.processForm.result === 'resolved') {
              dispute.status = 'resolved';
            } else if (this.processForm.result === 'unresolved') {
              dispute.status = 'closed';
            } else {
              dispute.status = 'processing';
            }
            
            this.$message.success('处理成功');
            this.processDialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    handleClose(id) {
      this.$confirm('确定要关闭这个纠纷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟关闭操作
        const index = this.disputeList.findIndex(item => item.id === id);
        if (index !== -1) {
          this.disputeList[index].status = 'closed';
        }
        this.$message.success('关闭成功');
      }).catch(() => {
        this.$message.info('取消关闭');
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑操作
            const index = this.disputeList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.disputeList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newDispute = {
              ...this.form,
              id: this.disputeList.length + 1
            };
            this.disputeList.push(newDispute);
            this.total = this.disputeList.length;
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
.legal-dispute {
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