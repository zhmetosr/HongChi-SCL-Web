<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>订单管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" clearable />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="请选择订单状态" clearable>
            <el-option label="待处理" value="pending" />
            <el-option label="处理中" value="processing" />
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
        <el-table-column min-width="180px" prop="orderNo" label="订单编号" />
        <el-table-column min-width="180px" prop="customerName" label="客户名称" />
        <el-table-column min-width="150px" prop="amount" label="订单金额">
          <template slot-scope="scope">
            <span>¥{{ scope.row.amount.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" prop="orderDate" label="下单日期">
          <template slot-scope="scope">
            <span>{{ scope.row.orderDate | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="{
              pending: 'warning',
              processing: 'info',
              completed: 'success',
              cancelled: 'danger'
            }[scope.row.status]">
              {{ {
                pending: '待处理',
                processing: '处理中',
                completed: '已完成',
                cancelled: '已取消'
              }[scope.row.status] }}
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
          <el-form-item label="订单编号" prop="orderNo">
            <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item label="客户名称" prop="customerId">
            <el-select v-model="form.customerId" placeholder="请选择客户">
              <el-option label="鸿驰祥瑞物流有限公司" value="1" />
              <el-option label="祥瑞供应链管理有限公司" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单金额" prop="amount">
            <el-input v-model.number="form.amount" placeholder="请输入订单金额" type="number" />
          </el-form-item>
          <el-form-item label="下单日期" prop="orderDate">
            <el-date-picker v-model="form.orderDate" type="date" placeholder="请选择下单日期" style="width: 100%" />
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择订单状态">
              <el-option label="待处理" value="pending" />
              <el-option label="处理中" value="processing" />
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
  name: 'OrderManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        orderNo: [
          { required: true, message: '请输入订单编号', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入订单金额', trigger: 'blur' },
          { type: 'number', message: '请输入有效的订单金额', trigger: 'blur' }
        ],
        orderDate: [
          { required: true, message: '请选择下单日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择订单状态', trigger: 'change' }
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
            orderNo: 'OD20260211001',
            customerName: '鸿驰祥瑞物流有限公司',
            amount: 10000,
            orderDate: new Date().toISOString(),
            status: 'completed',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            orderNo: 'OD20260211002',
            customerName: '祥瑞供应链管理有限公司',
            amount: 5000,
            orderDate: new Date().toISOString(),
            status: 'processing',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            orderNo: 'OD20260211003',
            customerName: '鸿驰祥瑞物流有限公司',
            amount: 8000,
            orderDate: new Date().toISOString(),
            status: 'pending',
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