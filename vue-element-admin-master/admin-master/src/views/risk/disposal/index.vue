<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>风险处置管理</span>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="处置流程" name="process">
          <el-button type="primary" size="small" style="margin-bottom: 15px" @click="handleAddProcess">
            <i class="el-icon-plus"></i> 新增处置流程
          </el-button>
          <el-table
            v-loading="processLoading"
            :data="processList"
            style="width: 100%"
            border
          >
            <el-table-column prop="id" label="流程ID" width="80" />
            <el-table-column prop="riskType" label="风险类型" width="120" />
            <el-table-column prop="name" label="流程名称" width="180" />
            <el-table-column prop="steps" label="处置步骤" width="200">
              <template slot-scope="scope">
                <el-tag v-for="(step, index) in scope.row.steps" :key="index" size="small" style="margin-right: 5px; margin-bottom: 5px">
                  {{ step }}
                </el-tag>
              </template>
            </el-table-column>
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
                <el-button type="primary" size="small" @click="handleEditProcess(scope.row)" circle>
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="danger" size="small" @click="handleDeleteProcess(scope.row.id)" circle>
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="processQuery.page"
            :page-size="processQuery.limit"
            :total="processTotal"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleProcessSizeChange"
            @current-change="handleProcessCurrentChange"
            style="margin-top: 20px"
          />
        </el-tab-pane>
        <el-tab-pane label="处置案例" name="case">
          <el-table
            v-loading="caseLoading"
            :data="caseList"
            style="width: 100%"
            border
          >
            <el-table-column prop="id" label="案例ID" width="80" />
            <el-table-column prop="riskId" label="风险事件" width="180" />
            <el-table-column prop="riskType" label="风险类型" width="120" />
            <el-table-column prop="processId" label="处置流程" width="150" />
            <el-table-column prop="status" label="处置状态" width="100">
              <template slot-scope="scope">
                <el-tag :type="getStatusType(scope.row.status)">
                  {{ getStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="disposalTime" label="处置时间" width="180" />
            <el-table-column prop="disposalResult" label="处置结果" width="150" />
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleViewCase(scope.row)" circle>
                  <i class="el-icon-view"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 新增/编辑处置流程对话框 -->
    <el-dialog :title="processDialog.title" :visible.sync="processDialog.visible" width="600px">
      <el-form :model="processForm" :rules="processRules" ref="processForm">
        <el-form-item label="流程名称" prop="name">
          <el-input v-model="processForm.name" placeholder="请输入流程名称" />
        </el-form-item>
        <el-form-item label="风险类型" prop="riskType">
          <el-select v-model="processForm.riskType" placeholder="请选择风险类型">
            <el-option label="交易风险" value="transaction" />
            <el-option label="运输风险" value="transport" />
            <el-option label="资金风险" value="finance" />
            <el-option label="合规风险" value="compliance" />
            <el-option label="其他风险" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="处置步骤" prop="steps">
          <el-tag
            v-for="(step, index) in processForm.steps"
            :key="index"
            closable
            @close="handleCloseStep(index)"
            style="margin-right: 8px; margin-bottom: 8px"
          >
            {{ step }}
          </el-tag>
          <el-input
            v-model="stepInput"
            placeholder="输入步骤后按Enter添加"
            @keyup.enter.native="handleAddStep"
            style="width: 300px; margin-top: 10px"
          />
        </el-form-item>
        <el-form-item label="流程描述" prop="description">
          <el-input type="textarea" v-model="processForm.description" placeholder="请输入流程描述" :rows="3" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="processForm.status" active-value="active" inactive-value="inactive" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="processDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleProcessSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看处置案例对话框 -->
    <el-dialog :title="'查看处置案例'" :visible.sync="caseDialog.visible" width="600px">
      <el-form :model="caseForm" label-width="100px">
        <el-form-item label="案例ID">
          <el-input v-model="caseForm.id" disabled />
        </el-form-item>
        <el-form-item label="风险事件">
          <el-input v-model="caseForm.riskId" disabled />
        </el-form-item>
        <el-form-item label="风险类型">
          <el-input v-model="caseForm.riskType" disabled />
        </el-form-item>
        <el-form-item label="处置流程">
          <el-input v-model="caseForm.processId" disabled />
        </el-form-item>
        <el-form-item label="处置步骤">
          <el-input type="textarea" v-model="caseForm.steps" disabled :rows="3" />
        </el-form-item>
        <el-form-item label="处置时间">
          <el-input v-model="caseForm.disposalTime" disabled />
        </el-form-item>
        <el-form-item label="处置结果">
          <el-input v-model="caseForm.disposalResult" disabled />
        </el-form-item>
        <el-form-item label="处置意见">
          <el-input type="textarea" v-model="caseForm.disposalComment" disabled :rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="caseDialog.visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RiskDisposal',
  data() {
    return {
      activeTab: 'process',
      processLoading: false,
      caseLoading: false,
      processList: [],
      caseList: [],
      processTotal: 0,
      processQuery: {
        page: 1,
        limit: 10
      },
      processDialog: {
        visible: false,
        title: ''
      },
      caseDialog: {
        visible: false
      },
      processForm: {
        id: '',
        name: '',
        riskType: '',
        steps: [],
        description: '',
        status: 'active'
      },
      caseForm: {
        id: '',
        riskId: '',
        riskType: '',
        processId: '',
        steps: '',
        disposalTime: '',
        disposalResult: '',
        disposalComment: ''
      },
      stepInput: '',
      processRules: {
        name: [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
        riskType: [{ required: true, message: '请选择风险类型', trigger: 'change' }],
        steps: [{ required: true, message: '请至少添加一个处置步骤', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getProcessList()
    this.getCaseList()
  },
  methods: {
    getProcessList() {
      this.processLoading = true
      // 模拟API请求
      setTimeout(() => {
        this.processList = [
          {
            id: 1,
            name: '交易风险处置流程',
            riskType: 'transaction',
            steps: ['风险识别', '风险评估', '风险处置', '风险跟踪'],
            status: 'active',
            createTime: '2026-02-01 10:00:00'
          },
          {
            id: 2,
            name: '运输风险处置流程',
            riskType: 'transport',
            steps: ['事件上报', '现场处理', '保险理赔', '总结改进'],
            status: 'active',
            createTime: '2026-02-02 11:00:00'
          },
          {
            id: 3,
            name: '资金风险处置流程',
            riskType: 'finance',
            steps: ['风险预警', '资金冻结', '调查核实', '资金追回'],
            status: 'inactive',
            createTime: '2026-02-03 12:00:00'
          }
        ]
        this.processTotal = 3
        this.processLoading = false
      }, 500)
    },
    getCaseList() {
      this.caseLoading = true
      // 模拟API请求
      setTimeout(() => {
        this.caseList = [
          {
            id: 1,
            riskId: '风险事件001',
            riskType: 'transaction',
            processId: '交易风险处置流程',
            steps: '风险识别 -> 风险评估 -> 风险处置 -> 风险跟踪',
            status: 'completed',
            disposalTime: '2026-02-10 09:00:00',
            disposalResult: '成功',
            disposalComment: '及时识别并处置了交易风险，避免了损失'
          },
          {
            id: 2,
            riskId: '风险事件002',
            riskType: 'transport',
            processId: '运输风险处置流程',
            steps: '事件上报 -> 现场处理 -> 保险理赔 -> 总结改进',
            status: 'completed',
            disposalTime: '2026-02-09 10:00:00',
            disposalResult: '成功',
            disposalComment: '妥善处理了运输过程中的货损问题，获得了保险赔偿'
          },
          {
            id: 3,
            riskId: '风险事件003',
            riskType: 'finance',
            processId: '资金风险处置流程',
            steps: '风险预警 -> 资金冻结 -> 调查核实 -> 资金追回',
            status: 'processing',
            disposalTime: '2026-02-08 12:00:00',
            disposalResult: '处理中',
            disposalComment: '正在处理资金风险，已冻结相关账户'
          }
        ]
        this.caseLoading = false
      }, 500)
    },
    handleAddProcess() {
      this.processDialog.title = '新增处置流程'
      this.processDialog.visible = true
      this.$nextTick(() => {
        this.$refs.processForm.resetFields()
        this.processForm = {
          id: '',
          name: '',
          riskType: '',
          steps: [],
          description: '',
          status: 'active'
        }
        this.stepInput = ''
      })
    },
    handleEditProcess(row) {
      this.processDialog.title = '编辑处置流程'
      this.processDialog.visible = true
      this.$nextTick(() => {
        this.processForm = { ...row }
        this.stepInput = ''
      })
    },
    handleDeleteProcess(id) {
      this.$confirm('确定要删除该处置流程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API请求
        setTimeout(() => {
          this.$message.success('删除成功')
          this.getProcessList()
        }, 500)
      })
    },
    handleAddStep() {
      if (this.stepInput && !this.processForm.steps.includes(this.stepInput)) {
        this.processForm.steps.push(this.stepInput)
        this.stepInput = ''
      }
    },
    handleCloseStep(index) {
      this.processForm.steps.splice(index, 1)
    },
    handleProcessSubmit() {
      this.$refs.processForm.validate((valid) => {
        if (valid) {
          // 模拟API请求
          setTimeout(() => {
            this.$message.success(this.processForm.id ? '编辑成功' : '新增成功')
            this.processDialog.visible = false
            this.getProcessList()
          }, 500)
        }
      })
    },
    handleViewCase(row) {
      this.caseDialog.visible = true
      this.$nextTick(() => {
        this.caseForm = { ...row }
      })
    },
    handleProcessSizeChange(size) {
      this.processQuery.limit = size
      this.getProcessList()
    },
    handleProcessCurrentChange(page) {
      this.processQuery.page = page
      this.getProcessList()
    },
    getStatusType(status) {
      const typeMap = {
        completed: 'success',
        processing: 'warning',
        failed: 'danger'
      }
      return typeMap[status] || 'info'
    },
    getStatusText(status) {
      const textMap = {
        completed: '已完成',
        processing: '处理中',
        failed: '失败'
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