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
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.name" placeholder="请输入产品名称" clearable />
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="searchForm.type" placeholder="请选择产品类型" clearable>
            <el-option label="物流服务" value="logistics" />
            <el-option label="仓储服务" value="warehousing" />
            <el-option label="供应链服务" value="supply_chain" />
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
      <el-table-column min-width="180px" prop="name" label="产品名称" />
      <el-table-column min-width="150px" prop="type" label="产品类型">
        <template slot-scope="scope">
          <el-tag :type="{
            logistics: 'info',
            warehousing: 'success',
            supply_chain: 'warning'
          }[scope.row.type]">
            {{ {
              logistics: '物流服务',
              warehousing: '仓储服务',
              supply_chain: '供应链服务'
            }[scope.row.type] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" prop="price" label="价格">
        <template slot-scope="scope">
          <span>¥{{ scope.row.price.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" prop="unit" label="单位" />
      <el-table-column min-width="150px" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ? 'success' : 'danger'">
            {{ scope.row.status ? '启用' : '禁用' }}
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
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择产品类型">
            <el-option label="物流服务" value="logistics" />
            <el-option label="仓储服务" value="warehousing" />
            <el-option label="供应链服务" value="supply_chain" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price" placeholder="请输入价格" type="number" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" active-text="启用" inactive-text="禁用" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入产品描述" type="textarea" />
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
  name: 'ProductManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '请输入有效的价格', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入单位', trigger: 'blur' }
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
            name: '国内公路运输服务',
            type: 'logistics',
            price: 1000,
            unit: '吨',
            status: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: '仓储托管服务',
            type: 'warehousing',
            price: 50,
            unit: '平方米/月',
            status: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: '供应链解决方案',
            type: 'supply_chain',
            price: 50000,
            unit: '套',
            status: false,
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