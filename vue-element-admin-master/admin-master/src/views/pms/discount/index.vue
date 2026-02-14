<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>折扣管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="折扣名称">
          <el-input v-model="searchForm.name" placeholder="请输入折扣名称" clearable />
        </el-form-item>
        <el-form-item label="折扣类型">
          <el-select v-model="searchForm.type" placeholder="请选择折扣类型" clearable>
            <el-option label="百分比折扣" value="percentage" />
            <el-option label="固定金额折扣" value="fixed" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" prop="id" label="ID" width="80" />
        <el-table-column min-width="180px" prop="name" label="折扣名称" />
        <el-table-column min-width="150px" prop="type" label="折扣类型">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type === 'percentage' ? 'info' : 'success'">
              {{ scope.row.type === 'percentage' ? '百分比折扣' : '固定金额折扣' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="value" label="折扣值">
          <template slot-scope="scope">
            <span>{{ scope.row.type === 'percentage' ? scope.row.value + '%' : '¥' + scope.row.value.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" prop="minAmount" label="最低消费">
          <template slot-scope="scope">
            <span>¥{{ scope.row.minAmount.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" prop="startDate" label="开始日期">
          <template slot-scope="scope">
            <span>{{ scope.row.startDate | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" prop="endDate" label="结束日期">
          <template slot-scope="scope">
            <span>{{ scope.row.endDate | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'danger'">
              {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" prop="createdAt" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdAt | parseTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
          :current-page="listQuery.page"
          :page-size="listQuery.limit"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 表单对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="折扣名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入折扣名称" />
          </el-form-item>
          <el-form-item label="折扣类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择折扣类型">
              <el-option label="百分比折扣" value="percentage" />
              <el-option label="固定金额折扣" value="fixed" />
            </el-select>
          </el-form-item>
          <el-form-item label="折扣值" prop="value">
            <el-input v-model.number="form.value" placeholder="请输入折扣值" type="number" />
          </el-form-item>
          <el-form-item label="最低消费" prop="minAmount">
            <el-input v-model.number="form.minAmount" placeholder="请输入最低消费" type="number" />
          </el-form-item>
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker v-model="form.startDate" type="date" placeholder="请选择开始日期" style="width: 100%" />
          </el-form-item>
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker v-model="form.endDate" type="date" placeholder="请选择结束日期" style="width: 100%" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="启用" value="enabled" />
              <el-option label="禁用" value="disabled" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit('form')">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import crud from '@/mixins/crud'

export default {
  name: 'DiscountManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入折扣名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择折扣类型', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请输入折扣值', trigger: 'blur' },
          { type: 'number', message: '请输入有效的折扣值', trigger: 'blur' }
        ],
        minAmount: [
          { required: true, message: '请输入最低消费', trigger: 'blur' },
          { type: 'number', message: '请输入有效的最低消费', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'change' }
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
            name: '新客户首单折扣',
            type: 'percentage',
            value: 10,
            minAmount: 1000,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'enabled',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: '大客户专享折扣',
            type: 'fixed',
            value: 500,
            minAmount: 10000,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'enabled',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: '节假日促销折扣',
            type: 'percentage',
            value: 15,
            minAmount: 5000,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'disabled',
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
.crud-container {
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

.dialog-footer {
  text-align: right;
}
</style>