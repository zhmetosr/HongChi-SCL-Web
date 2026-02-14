<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>回单管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="回单编号">
          <el-input v-model="searchForm.returnNo" placeholder="请输入回单编号" clearable />
        </el-form-item>
        <el-form-item label="运单号">
          <el-input v-model="searchForm.waybillNo" placeholder="请输入运单号" clearable />
        </el-form-item>
        <el-form-item label="回单状态">
          <el-select v-model="searchForm.status" placeholder="请选择回单状态" clearable>
            <el-option label="待回单" value="pending" />
            <el-option label="已回单" value="completed" />
            <el-option label="异常" value="exception" />
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
        <el-table-column min-width="180px" prop="returnNo" label="回单编号" />
        <el-table-column min-width="180px" prop="waybillNo" label="运单号" />
        <el-table-column min-width="180px" prop="customerName" label="客户名称" />
        <el-table-column min-width="150px" prop="returnDate" label="回单日期">
          <template slot-scope="scope">
            <span>{{ scope.row.returnDate | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="{
              pending: 'warning',
              completed: 'success',
              exception: 'danger'
            }[scope.row.status]">
              {{ {
                pending: '待回单',
                completed: '已回单',
                exception: '异常'
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
          <el-form-item label="回单编号" prop="returnNo">
            <el-input v-model="form.returnNo" placeholder="请输入回单编号" />
          </el-form-item>
          <el-form-item label="运单号" prop="waybillId">
            <el-select v-model="form.waybillId" placeholder="请选择运单">
              <el-option label="WB20260211001" value="1" />
              <el-option label="WB20260211002" value="2" />
              <el-option label="WB20260211003" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称" prop="customerId">
            <el-select v-model="form.customerId" placeholder="请选择客户">
              <el-option label="鸿驰祥瑞物流有限公司" value="1" />
              <el-option label="祥瑞供应链管理有限公司" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="回单日期" prop="returnDate">
            <el-date-picker v-model="form.returnDate" type="date" placeholder="请选择回单日期" style="width: 100%" />
          </el-form-item>
          <el-form-item label="回单状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择回单状态">
              <el-option label="待回单" value="pending" />
              <el-option label="已回单" value="completed" />
              <el-option label="异常" value="exception" />
            </el-select>
          </el-form-item>
          <el-form-item label="回单信息" prop="returnInfo">
            <el-input v-model="form.returnInfo" placeholder="请输入回单信息" type="textarea" />
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
  name: 'ReturnManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        returnNo: [
          { required: true, message: '请输入回单编号', trigger: 'blur' }
        ],
        waybillId: [
          { required: true, message: '请选择运单', trigger: 'change' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        returnDate: [
          { required: true, message: '请选择回单日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择回单状态', trigger: 'change' }
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
            returnNo: 'RT20260211001',
            waybillNo: 'WB20260211001',
            customerName: '鸿驰祥瑞物流有限公司',
            returnDate: new Date().toISOString(),
            status: 'completed',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            returnNo: 'RT20260211002',
            waybillNo: 'WB20260211002',
            customerName: '祥瑞供应链管理有限公司',
            returnDate: new Date().toISOString(),
            status: 'pending',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            returnNo: 'RT20260211003',
            waybillNo: 'WB20260211003',
            customerName: '鸿驰祥瑞物流有限公司',
            returnDate: new Date().toISOString(),
            status: 'exception',
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