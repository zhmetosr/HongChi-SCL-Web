<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>出入库管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="出入库单号">
          <el-input v-model="searchForm.inoutNo" placeholder="请输入出入库单号" clearable />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.productName" placeholder="请输入商品名称" clearable />
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="searchForm.type" placeholder="请选择操作类型" clearable>
            <el-option label="入库" value="in" />
            <el-option label="出库" value="out" />
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
        <el-table-column min-width="180px" prop="inoutNo" label="出入库单号" />
        <el-table-column min-width="150px" prop="productNo" label="商品编号" />
        <el-table-column min-width="180px" prop="productName" label="商品名称" />
        <el-table-column min-width="150px" prop="warehouseName" label="仓库" />
        <el-table-column min-width="120px" prop="quantity" label="数量" />
        <el-table-column min-width="100px" prop="type" label="操作类型">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type === 'in' ? 'success' : 'danger'">
              {{ scope.row.type === 'in' ? '入库' : '出库' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" prop="operationDate" label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.operationDate | parseTime }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'completed' ? 'success' : 'warning'">
              {{ scope.row.status === 'completed' ? '已完成' : '待处理' }}
            </el-tag>
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
          <el-form-item label="出入库单号" prop="inoutNo">
            <el-input v-model="form.inoutNo" placeholder="请输入出入库单号" />
          </el-form-item>
          <el-form-item label="商品编号" prop="productNo">
            <el-input v-model="form.productNo" placeholder="请输入商品编号" />
          </el-form-item>
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="form.productName" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="仓库" prop="warehouseId">
            <el-select v-model="form.warehouseId" placeholder="请选择仓库">
              <el-option label="北京总部仓库" value="1" />
              <el-option label="上海分仓" value="2" />
              <el-option label="广州冷链仓库" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="数量" prop="quantity">
            <el-input v-model.number="form.quantity" placeholder="请输入数量" type="number" />
          </el-form-item>
          <el-form-item label="操作类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择操作类型">
              <el-option label="入库" value="in" />
              <el-option label="出库" value="out" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="待处理" value="pending" />
              <el-option label="已完成" value="completed" />
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
  name: 'InOutManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        inoutNo: [
          { required: true, message: '请输入出入库单号', trigger: 'blur' }
        ],
        productNo: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        warehouseId: [
          { required: true, message: '请选择仓库', trigger: 'change' }
        ],
        quantity: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { type: 'number', message: '请输入有效的数量', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择操作类型', trigger: 'change' }
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
            inoutNo: 'IO20260211001',
            productNo: 'PRD20260211001',
            productName: '电子产品A',
            warehouseName: '北京总部仓库',
            quantity: 100,
            type: 'in',
            operationDate: new Date().toISOString(),
            status: 'completed'
          },
          {
            id: 2,
            inoutNo: 'IO20260211002',
            productNo: 'PRD20260211002',
            productName: '服装B',
            warehouseName: '上海分仓',
            quantity: 50,
            type: 'out',
            operationDate: new Date().toISOString(),
            status: 'completed'
          },
          {
            id: 3,
            inoutNo: 'IO20260211003',
            productNo: 'PRD20260211003',
            productName: '食品C',
            warehouseName: '广州冷链仓库',
            quantity: 30,
            type: 'in',
            operationDate: new Date().toISOString(),
            status: 'pending'
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