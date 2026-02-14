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
        <el-form-item label="合同编号">
          <el-input v-model="searchForm.code" placeholder="请输入合同编号" clearable />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="合同状态">
          <el-select v-model="searchForm.status" placeholder="请选择合同状态" clearable>
            <el-option label="草稿" value="draft" />
            <el-option label="已签署" value="signed" />
            <el-option label="已过期" value="expired" />
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
      <el-table-column min-width="180px" prop="code" label="合同编号" />
      <el-table-column min-width="180px" prop="customerName" label="客户名称" />
      <el-table-column min-width="150px" prop="amount" label="合同金额">
        <template slot-scope="scope">
          <span>¥{{ scope.row.amount.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" prop="signDate" label="签署日期">
        <template slot-scope="scope">
          <span>{{ scope.row.signDate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" prop="expireDate" label="到期日期">
        <template slot-scope="scope">
          <span>{{ scope.row.expireDate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="{
            draft: 'info',
            signed: 'success',
            expired: 'danger'
          }[scope.row.status]">
            {{ {
              draft: '草稿',
              signed: '已签署',
              expired: '已过期'
            }[scope.row.status] }}
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
        <el-form-item label="合同编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerId">
          <el-select v-model="form.customerId" placeholder="请选择客户">
            <el-option label="鸿驰祥瑞物流有限公司" value="1" />
            <el-option label="祥瑞供应链管理有限公司" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同金额" prop="amount">
          <el-input v-model.number="form.amount" placeholder="请输入合同金额" type="number" />
        </el-form-item>
        <el-form-item label="签署日期" prop="signDate">
          <el-date-picker v-model="form.signDate" type="date" placeholder="请选择签署日期" style="width: 100%" />
        </el-form-item>
        <el-form-item label="到期日期" prop="expireDate">
          <el-date-picker v-model="form.expireDate" type="date" placeholder="请选择到期日期" style="width: 100%" />
        </el-form-item>
        <el-form-item label="合同状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择合同状态">
            <el-option label="草稿" value="draft" />
            <el-option label="已签署" value="signed" />
            <el-option label="已过期" value="expired" />
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
  name: 'ContractManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { type: 'number', message: '请输入有效的金额', trigger: 'blur' }
        ],
        signDate: [
          { required: true, message: '请选择签署日期', trigger: 'change' }
        ],
        expireDate: [
          { required: true, message: '请选择到期日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择合同状态', trigger: 'change' }
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
            code: 'HT20260211001',
            customerName: '鸿驰祥瑞物流有限公司',
            amount: 1200000,
            signDate: new Date().toISOString(),
            expireDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'signed',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            code: 'HT20260211002',
            customerName: '祥瑞供应链管理有限公司',
            amount: 600000,
            signDate: new Date().toISOString(),
            expireDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'draft',
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