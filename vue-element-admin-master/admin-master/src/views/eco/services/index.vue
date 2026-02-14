<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>增值服务管理</span>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="服务管理" name="service">
          <el-button type="primary" size="small" style="margin-bottom: 15px" @click="handleAdd">
            <i class="el-icon-plus"></i> 新增服务
          </el-button>
          <el-table
            v-loading="listLoading"
            :data="serviceList"
            style="width: 100%"
            border
          >
            <el-table-column prop="id" label="服务ID" width="80" />
            <el-table-column prop="name" label="服务名称" width="180" />
            <el-table-column prop="type" label="服务类型" width="120" />
            <el-table-column prop="partnerId" label="合作方ID" width="120" />
            <el-table-column prop="price" label="服务价格" width="100" />
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
        <el-tab-pane label="服务调用记录" name="log">
          <el-table
            v-loading="logLoading"
            :data="callLogList"
            style="width: 100%"
            border
          >
            <el-table-column prop="id" label="记录ID" width="80" />
            <el-table-column prop="serviceId" label="服务ID" width="100" />
            <el-table-column prop="serviceName" label="服务名称" width="180" />
            <el-table-column prop="userId" label="调用用户" width="120" />
            <el-table-column prop="status" label="调用状态" width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
                  {{ scope.row.status === 'success' ? '成功' : '失败' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="callTime" label="调用时间" width="180" />
            <el-table-column prop="responseTime" label="响应时间(ms)" width="120" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 新增/编辑服务对话框 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="服务类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择服务类型">
            <el-option label="金融服务" value="finance" />
            <el-option label="保险服务" value="insurance" />
            <el-option label="包装服务" value="packaging" />
            <el-option label="其他服务" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="合作方" prop="partnerId">
          <el-select v-model="form.partnerId" placeholder="请选择合作方">
            <el-option v-for="partner in partners" :key="partner.id" :label="partner.name" :value="partner.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :step="0.01" placeholder="请输入服务价格" />
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
  </div>
</template>

<script>
export default {
  name: 'EcoServices',
  data() {
    return {
      activeTab: 'service',
      listLoading: false,
      logLoading: false,
      serviceList: [],
      callLogList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialog: {
        visible: false,
        title: ''
      },
      form: {
        id: '',
        name: '',
        type: '',
        partnerId: '',
        price: 0,
        description: '',
        status: 'active'
      },
      rules: {
        name: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
        partnerId: [{ required: true, message: '请选择合作方', trigger: 'change' }],
        price: [{ required: true, message: '请输入服务价格', trigger: 'blur' }]
      },
      partners: [
        { id: 1, name: '中国银行' },
        { id: 2, name: '平安保险' },
        { id: 3, name: '顺丰包装' }
      ]
    }
  },
  created() {
    this.getServiceList()
    this.getCallLogList()
  },
  methods: {
    getServiceList() {
      this.listLoading = true
      // 模拟API请求
      setTimeout(() => {
        this.serviceList = [
          { id: 1, name: '物流贷', type: 'finance', partnerId: 1, price: 0, status: 'active', createTime: '2026-02-01 10:00:00' },
          { id: 2, name: '货运险', type: 'insurance', partnerId: 2, price: 50, status: 'active', createTime: '2026-02-02 11:00:00' },
          { id: 3, name: '定制包装', type: 'packaging', partnerId: 3, price: 20, status: 'inactive', createTime: '2026-02-03 12:00:00' }
        ]
        this.total = 3
        this.listLoading = false
      }, 500)
    },
    getCallLogList() {
      this.logLoading = true
      // 模拟API请求
      setTimeout(() => {
        this.callLogList = [
          { id: 1, serviceId: 1, serviceName: '物流贷', userId: 'admin', status: 'success', callTime: '2026-02-10 09:00:00', responseTime: 120 },
          { id: 2, serviceId: 2, serviceName: '货运险', userId: 'user1', status: 'success', callTime: '2026-02-10 10:00:00', responseTime: 80 },
          { id: 3, serviceId: 3, serviceName: '定制包装', userId: 'user2', status: 'failed', callTime: '2026-02-10 11:00:00', responseTime: 200 }
        ]
        this.logLoading = false
      }, 500)
    },
    handleAdd() {
      this.dialog.title = '新增服务'
      this.dialog.visible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = {
          id: '',
          name: '',
          type: '',
          partnerId: '',
          price: 0,
          description: '',
          status: 'active'
        }
      })
    },
    handleEdit(row) {
      this.dialog.title = '编辑服务'
      this.dialog.visible = true
      this.$nextTick(() => {
        this.form = { ...row }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该服务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API请求
        setTimeout(() => {
          this.$message.success('删除成功')
          this.getServiceList()
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
            this.getServiceList()
          }, 500)
        }
      })
    },
    handleSizeChange(size) {
      this.listQuery.limit = size
      this.getServiceList()
    },
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getServiceList()
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