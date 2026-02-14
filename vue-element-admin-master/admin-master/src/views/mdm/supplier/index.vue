<template>
  <div class="mdm-supplier-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="供应商名称">
          <el-input v-model="searchForm.name" placeholder="请输入供应商名称" clearable />
        </el-form-item>
        <el-form-item label="供应商编号">
          <el-input v-model="searchForm.code" placeholder="请输入供应商编号" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增供应商</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <el-table :data="supplierList" style="width: 100%" border>
        <el-table-column prop="code" label="供应商编号" width="120" />
        <el-table-column prop="name" label="供应商名称" />
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.type === 'line' ? '物流专线' : '司机' }}
          </template>
        </el-table-column>
        <el-table-column prop="contactName" label="联系人" width="100" />
        <el-table-column prop="contactPhone" label="联系电话" width="150" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '活跃' : '禁用' }}
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
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="供应商编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入供应商编号" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" type="textarea" rows="2" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="active">活跃</el-radio>
            <el-radio label="inactive">禁用</el-radio>
          </el-radio-group>
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
  name: 'MDMSupplier',
  data() {
    return {
      searchForm: {
        name: '',
        code: '',
        type: ''
      },
      supplierList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        code: '',
        name: '',
        type: 'line',
        contactName: '',
        contactPhone: '',
        address: '',
        status: 'active'
      },
      rules: {
        code: [{ required: true, message: '请输入供应商编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      },
      typeOptions: [
        { value: 'line', label: '物流专线' },
        { value: 'driver', label: '司机' }
      ]
    }
  },
  created() {
    this.getSupplierList()
  },
  methods: {
    getSupplierList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            code: 'S001',
            name: '北京-上海专线',
            type: 'line',
            contactName: '王五',
            contactPhone: '13700137000',
            address: '北京市丰台区新发地物流园',
            status: 'active'
          },
          {
            id: 2,
            code: 'S002',
            name: '赵六',
            type: 'driver',
            contactName: '赵六',
            contactPhone: '13600136000',
            address: '河北省保定市',
            status: 'active'
          }
        ],
        total: 2
      }
      this.supplierList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getSupplierList()
    },
    resetForm() {
      this.searchForm = {
        name: '',
        code: '',
        type: ''
      }
      this.getSupplierList()
    },
    handleAdd() {
      this.dialogTitle = '新增供应商'
      this.form = {
        id: '',
        code: '',
        name: '',
        type: 'line',
        contactName: '',
        contactPhone: '',
        address: '',
        status: 'active'
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑供应商'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('提交数据:', this.form)
          this.dialogVisible = false
          this.getSupplierList()
          this.$message.success('操作成功')
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该供应商吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('删除供应商:', id)
        this.getSupplierList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getSupplierList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getSupplierList()
    }
  }
}
</script>

<style scoped>
.mdm-supplier-container {
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