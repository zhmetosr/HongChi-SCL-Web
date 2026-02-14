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
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.name" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="客户类型">
          <el-select v-model="searchForm.type" placeholder="请选择客户类型" clearable>
            <el-option label="企业客户" value="enterprise" />
            <el-option label="个人客户" value="individual" />
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
      <el-table-column min-width="150px" prop="name" label="客户名称" />
      <el-table-column min-width="120px" prop="type" label="客户类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 'enterprise' ? 'success' : 'info'">
            {{ scope.row.type === 'enterprise' ? '企业客户' : '个人客户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" prop="contact" label="联系人" />
      <el-table-column min-width="150px" prop="phone" label="联系电话" />
      <el-table-column min-width="180px" prop="address" label="地址" />
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
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="客户类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择客户类型">
            <el-option label="企业客户" value="enterprise" />
            <el-option label="个人客户" value="individual" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" type="textarea" />
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
  name: 'CustomerManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
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
            name: '鸿驰祥瑞物流有限公司',
            type: 'enterprise',
            contact: '张经理',
            phone: '13800138001',
            address: '北京市朝阳区建国路88号',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: '祥瑞供应链管理有限公司',
            type: 'enterprise',
            contact: '李总',
            phone: '13900139001',
            address: '上海市浦东新区张江高科技园区',
            createdAt: new Date().toISOString()
          }
        ]
        this.total = 2
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