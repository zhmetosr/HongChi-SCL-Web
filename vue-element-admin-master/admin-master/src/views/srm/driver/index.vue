<template>
  <div class="app-container">
    <!-- 操作按钮区域 -->
    <div class="operation-area">
      <el-button type="primary" @click="handleAdd">
        <svg-icon icon-class="plus" /> 新增
      </el-button>
      <el-button type="warning" @click="handleBatchDelete" :disabled="multipleSelection.length === 0">
        <svg-icon icon-class="delete" /> 批量删除
      </el-button>
    </div>

    <!-- 搜索区域 -->
    <div class="search-area">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="司机姓名">
          <el-input v-model="searchForm.name" placeholder="请输入司机姓名" clearable />
        </el-form-item>
        <el-form-item label="所属供应商">
          <el-input v-model="searchForm.supplierName" placeholder="请输入所属供应商" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="在职" value="active" />
            <el-option label="离职" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column align="center" prop="id" label="ID" width="80" />
      <el-table-column min-width="120px" prop="name" label="姓名" />
      <el-table-column min-width="150px" prop="driverLicense" label="驾驶证号" />
      <el-table-column min-width="150px" prop="phone" label="联系电话" />
      <el-table-column min-width="180px" prop="supplierName" label="所属供应商" />
      <el-table-column min-width="120px" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '在职' : '离职' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            <svg-icon icon-class="edit" /> 编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">
            <svg-icon icon-class="delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="驾驶证号" prop="driverLicense">
          <el-input v-model="form.driverLicense" placeholder="请输入驾驶证号" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="所属供应商" prop="supplierId">
          <el-select v-model="form.supplierId" placeholder="请选择所属供应商">
            <el-option label="顺丰速运有限公司" value="1" />
            <el-option label="京东物流有限公司" value="2" />
            <el-option label="三通一达物流联盟" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="在职" value="active" />
            <el-option label="离职" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" type="textarea" />
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
import crud from '@/mixins/crud'

export default {
  name: 'DriverManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        driverLicense: [
          { required: true, message: '请输入驾驶证号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        supplierId: [
          { required: true, message: '请选择所属供应商', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      // 模拟数据
      setTimeout(() => {
        this.list = [
          {
            id: 1,
            name: '张三',
            driverLicense: '110101199001011234',
            phone: '13800138001',
            supplierName: '顺丰速运有限公司',
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: '李四',
            driverLicense: '310101199102022345',
            phone: '13900139001',
            supplierName: '京东物流有限公司',
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: '王五',
            driverLicense: '440101199203033456',
            phone: '13700137001',
            supplierName: '三通一达物流联盟',
            status: 'inactive',
            createdAt: new Date().toISOString()
          }
        ]
        this.total = 3
        this.listLoading = false
      }, 500)
    }
  }
}
</script>

<style scoped>
.operation-area {
  margin-bottom: 16px;
}

.search-area {
  margin-bottom: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 4px;
}

.dialog-footer {
  text-align: right;
}
</style>