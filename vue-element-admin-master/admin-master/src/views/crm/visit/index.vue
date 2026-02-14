<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>拜访管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="拜访状态">
          <el-select v-model="searchForm.status" placeholder="请选择拜访状态" clearable>
            <el-option label="计划中" value="planned" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
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
        <el-table-column min-width="180px" prop="customerName" label="客户名称" />
        <el-table-column min-width="120px" prop="contactName" label="联系人" />
        <el-table-column min-width="150px" prop="visitDate" label="拜访日期">
          <template slot-scope="scope">
            <span>{{ scope.row.visitDate | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="{
              planned: 'warning',
              completed: 'success',
              cancelled: 'danger'
            }[scope.row.status]">
              {{ {
                planned: '计划中',
                completed: '已完成',
                cancelled: '已取消'
              }[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="visitor" label="拜访人" />
        <el-table-column min-width="200px" prop="purpose" label="拜访目的" />
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
          <el-form-item label="客户名称" prop="customerId">
            <el-select v-model="form.customerId" placeholder="请选择客户">
              <el-option label="鸿驰祥瑞物流有限公司" value="1" />
              <el-option label="祥瑞供应链管理有限公司" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contactId">
            <el-select v-model="form.contactId" placeholder="请选择联系人">
              <el-option label="张经理" value="1" />
              <el-option label="李总" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="拜访日期" prop="visitDate">
            <el-date-picker v-model="form.visitDate" type="date" placeholder="请选择拜访日期" style="width: 100%" />
          </el-form-item>
          <el-form-item label="拜访人" prop="visitor">
            <el-input v-model="form.visitor" placeholder="请输入拜访人" />
          </el-form-item>
          <el-form-item label="拜访目的" prop="purpose">
            <el-input v-model="form.purpose" placeholder="请输入拜访目的" />
          </el-form-item>
          <el-form-item label="拜访状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择拜访状态">
              <el-option label="计划中" value="planned" />
              <el-option label="已完成" value="completed" />
              <el-option label="已取消" value="cancelled" />
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
  name: 'VisitManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        contactId: [
          { required: true, message: '请选择联系人', trigger: 'change' }
        ],
        visitDate: [
          { required: true, message: '请选择拜访日期', trigger: 'change' }
        ],
        visitor: [
          { required: true, message: '请输入拜访人', trigger: 'blur' }
        ],
        purpose: [
          { required: true, message: '请输入拜访目的', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择拜访状态', trigger: 'change' }
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
            customerName: '鸿驰祥瑞物流有限公司',
            contactName: '张经理',
            visitDate: new Date().toISOString(),
            status: 'completed',
            visitor: '王销售',
            purpose: '业务洽谈',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            customerName: '祥瑞供应链管理有限公司',
            contactName: '李总',
            visitDate: new Date().toISOString(),
            status: 'planned',
            visitor: '赵经理',
            purpose: '合作意向',
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