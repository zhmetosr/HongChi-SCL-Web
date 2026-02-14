<template>
  <div class="eco-partners-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="伙伴名称">
          <el-input v-model="searchForm.name" placeholder="请输入伙伴名称" clearable />
        </el-form-item>
        <el-form-item label="伙伴类型">
          <el-select v-model="searchForm.type" placeholder="请选择伙伴类型" clearable>
            <el-option label="金融机构" value="finance" />
            <el-option label="保险机构" value="insurance" />
            <el-option label="包装供应商" value="packaging" />
            <el-option label="海关/口岸" value="customs" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增生态伙伴</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <div class="stats-container">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">总生态伙伴</div>
              <div class="stat-value">{{ totalPartners }}</div>
              <div class="stat-change positive">+8.5% 较上月</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">活跃伙伴</div>
              <div class="stat-value">{{ activePartners }}</div>
              <div class="stat-change positive">+12.3% 较上月</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">服务调用次数</div>
              <div class="stat-value">{{ serviceCalls }}</div>
              <div class="stat-change positive">+15.7% 较上月</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">新增伙伴</div>
              <div class="stat-value">{{ newPartners }}</div>
              <div class="stat-change positive">+25.0% 较上月</div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-table :data="partnerList" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="伙伴名称" />
        <el-table-column prop="type" label="伙伴类型" width="120">
          <template slot-scope="scope">
            {{ getTypeText(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="contactName" label="联系人" width="100" />
        <el-table-column prop="contactPhone" label="联系电话" width="150" />
        <el-table-column prop="services" label="提供服务" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'danger'">
              {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" :type="scope.row.status === 'enabled' ? 'warning' : 'success'" @click="handleToggleStatus(scope.row)">
              {{ scope.row.status === 'enabled' ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="primary" @click="handleCallService(scope.row)">调用服务</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="伙伴名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入伙伴名称" />
        </el-form-item>
        <el-form-item label="伙伴类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择伙伴类型">
            <el-option label="金融机构" value="finance" />
            <el-option label="保险机构" value="insurance" />
            <el-option label="包装供应商" value="packaging" />
            <el-option label="海关/口岸" value="customs" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="提供服务" prop="services">
          <el-input v-model="form.services" placeholder="请输入提供服务" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="API地址" prop="apiUrl">
          <el-input v-model="form.apiUrl" placeholder="请输入API地址" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog title="伙伴详情" :visible.sync="viewDialogVisible" width="800px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="伙伴名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="伙伴类型">{{ getTypeText(viewForm.type) }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ viewForm.contactName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ viewForm.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="提供服务">{{ viewForm.services }}</el-descriptions-item>
        <el-descriptions-item label="API地址">{{ viewForm.apiUrl }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ viewForm.status === 'enabled' ? '启用' : '禁用' }}</el-descriptions-item>
        <el-descriptions-item label="合作开始日期">{{ viewForm.cooperationStartDate }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ viewForm.remark }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 调用服务对话框 -->
    <el-dialog title="调用服务" :visible.sync="serviceDialogVisible" width="600px">
      <el-form :model="serviceForm" :rules="serviceRules" ref="serviceForm" label-width="100px">
        <el-form-item label="伙伴名称">
          <el-input v-model="serviceForm.partnerName" readonly />
        </el-form-item>
        <el-form-item label="服务类型" prop="serviceType">
          <el-select v-model="serviceForm.serviceType" placeholder="请选择服务类型">
            <el-option label="物流贷" value="logistics_loan" />
            <el-option label="货运险" value="cargo_insurance" />
            <el-option label="包装服务" value="packaging_service" />
            <el-option label="报关服务" value="customs_clearance" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务参数" prop="parameters">
          <el-input v-model="serviceForm.parameters" placeholder="请输入服务参数" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="serviceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleServiceSubmit">调用</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EcoPartners',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        status: ''
      },
      partnerList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      totalPartners: 25,
      activePartners: 22,
      serviceCalls: 1250,
      newPartners: 5,
      dialogVisible: false,
      viewDialogVisible: false,
      serviceDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        name: '',
        type: '',
        contactName: '',
        contactPhone: '',
        services: '',
        apiUrl: '',
        status: 'enabled',
        cooperationStartDate: '',
        remark: ''
      },
      viewForm: {
        name: '',
        type: '',
        contactName: '',
        contactPhone: '',
        services: '',
        apiUrl: '',
        status: '',
        cooperationStartDate: '',
        remark: ''
      },
      serviceForm: {
        partnerName: '',
        serviceType: '',
        parameters: ''
      },
      rules: {
        name: [{ required: true, message: '请输入伙伴名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择伙伴类型', trigger: 'change' }],
        contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        services: [{ required: true, message: '请输入提供服务', trigger: 'blur' }],
        apiUrl: [{ required: true, message: '请输入API地址', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      serviceRules: {
        serviceType: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
        parameters: [{ required: true, message: '请输入服务参数', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getPartnerList()
  },
  methods: {
    getPartnerList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            name: '中国工商银行',
            type: 'finance',
            contactName: '张三',
            contactPhone: '13800138000',
            services: '物流贷、保理服务',
            apiUrl: 'https://api.icbc.com.cn/logistics',
            status: 'enabled',
            cooperationStartDate: '2026-01-01',
            remark: '战略合作伙伴'
          },
          {
            id: 2,
            name: '太平洋保险',
            type: 'insurance',
            contactName: '李四',
            contactPhone: '13900139000',
            services: '货运险、车险',
            apiUrl: 'https://api.cpic.com.cn/logistics',
            status: 'enabled',
            cooperationStartDate: '2026-01-01',
            remark: '核心保险伙伴'
          },
          {
            id: 3,
            name: '顺丰包装',
            type: 'packaging',
            contactName: '王五',
            contactPhone: '13700137000',
            services: '定制包装、物流包装材料',
            apiUrl: 'https://api.sf-express.com/packaging',
            status: 'enabled',
            cooperationStartDate: '2026-01-15',
            remark: '包装服务供应商'
          },
          {
            id: 4,
            name: '上海海关',
            type: 'customs',
            contactName: '赵六',
            contactPhone: '13600136000',
            services: '报关服务、清关服务',
            apiUrl: 'https://api.customs.gov.cn/shanghai',
            status: 'enabled',
            cooperationStartDate: '2026-01-20',
            remark: '官方合作伙伴'
          }
        ],
        total: 4
      }
      this.partnerList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getPartnerList()
    },
    resetForm() {
      this.searchForm = {
        name: '',
        type: '',
        status: ''
      }
      this.getPartnerList()
    },
    handleAdd() {
      this.dialogTitle = '新增生态伙伴'
      this.form = {
        id: '',
        name: '',
        type: '',
        contactName: '',
        contactPhone: '',
        services: '',
        apiUrl: '',
        status: 'enabled',
        cooperationStartDate: new Date().toISOString().split('T')[0],
        remark: ''
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑生态伙伴'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleView(row) {
      this.viewForm = { ...row }
      this.viewDialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('提交数据:', this.form)
          this.dialogVisible = false
          this.getPartnerList()
          this.$message.success('操作成功')
        }
      })
    },
    handleToggleStatus(row) {
      const newStatus = row.status === 'enabled' ? 'disabled' : 'enabled'
      this.$confirm(`确定要${newStatus === 'enabled' ? '启用' : '禁用'}该生态伙伴吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('切换状态:', row.id, newStatus)
        this.getPartnerList()
        this.$message.success('操作成功')
      }).catch(() => {})
    },
    handleCallService(row) {
      this.serviceForm = {
        partnerName: row.name,
        serviceType: '',
        parameters: ''
      }
      this.serviceDialogVisible = true
    },
    handleServiceSubmit() {
      this.$refs.serviceForm.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('调用服务:', this.serviceForm)
          this.serviceDialogVisible = false
          this.$message.success('服务调用成功')
        }
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getPartnerList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getPartnerList()
    },
    getTypeText(type) {
      const typeMap = {
        finance: '金融机构',
        insurance: '保险机构',
        packaging: '包装供应商',
        customs: '海关/口岸'
      }
      return typeMap[type] || type
    }
  }
}
</script>

<style scoped>
.eco-partners-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.search-form {
  margin-bottom: 0;
}

.stats-container {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  color: #67c23a;
}

.stat-change.positive {
  color: #67c23a;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>