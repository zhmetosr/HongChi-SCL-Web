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
        <el-form-item label="运单号">
          <el-input v-model="searchForm.waybillNo" placeholder="请输入运单号" clearable />
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderNo" placeholder="请输入订单号" clearable />
        </el-form-item>
        <el-form-item label="运单状态">
          <el-select v-model="searchForm.status" placeholder="请选择运单状态" clearable>
            <el-option label="待发货" value="pending" />
            <el-option label="运输中" value="shipping" />
            <el-option label="已送达" value="delivered" />
            <el-option label="已取消" value="cancelled" />
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
      <el-table-column min-width="180px" prop="waybillNo" label="运单号" />
      <el-table-column min-width="180px" prop="orderNo" label="订单号" />
      <el-table-column min-width="180px" prop="customerName" label="客户名称" />
      <el-table-column min-width="150px" prop="startLocation" label="起点" />
      <el-table-column min-width="150px" prop="endLocation" label="终点" />
      <el-table-column min-width="120px" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="{
            pending: 'warning',
            shipping: 'info',
            delivered: 'success',
            cancelled: 'danger'
          }[scope.row.status]">
            {{ {
              pending: '待发货',
              shipping: '运输中',
              delivered: '已送达',
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
        <el-form-item label="运单号" prop="waybillNo">
          <el-input v-model="form.waybillNo" placeholder="请输入运单号" />
        </el-form-item>
        <el-form-item label="订单号" prop="orderId">
          <el-select v-model="form.orderId" placeholder="请选择订单">
            <el-option label="ORD20260211001" value="1" />
            <el-option label="ORD20260211002" value="2" />
            <el-option label="ORD20260211003" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerId">
          <el-select v-model="form.customerId" placeholder="请选择客户">
            <el-option label="鸿驰祥瑞物流有限公司" value="1" />
            <el-option label="祥瑞供应链管理有限公司" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="起点" prop="startLocation">
          <el-input v-model="form.startLocation" placeholder="请输入起点" />
        </el-form-item>
        <el-form-item label="终点" prop="endLocation">
          <el-input v-model="form.endLocation" placeholder="请输入终点" />
        </el-form-item>
        <el-form-item label="运单状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择运单状态">
            <el-option label="待发货" value="pending" />
            <el-option label="运输中" value="shipping" />
            <el-option label="已送达" value="delivered" />
            <el-option label="已取消" value="cancelled" />
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
  name: 'WaybillManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        waybillNo: [
          { required: true, message: '请输入运单号', trigger: 'blur' }
        ],
        orderId: [
          { required: true, message: '请选择订单', trigger: 'change' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        startLocation: [
          { required: true, message: '请输入起点', trigger: 'blur' }
        ],
        endLocation: [
          { required: true, message: '请输入终点', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择运单状态', trigger: 'change' }
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
            waybillNo: 'WB20260211001',
            orderNo: 'ORD20260211001',
            customerName: '鸿驰祥瑞物流有限公司',
            startLocation: '北京市',
            endLocation: '上海市',
            status: 'delivered',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            waybillNo: 'WB20260211002',
            orderNo: 'ORD20260211002',
            customerName: '祥瑞供应链管理有限公司',
            startLocation: '广州市',
            endLocation: '深圳市',
            status: 'shipping',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            waybillNo: 'WB20260211003',
            orderNo: 'ORD20260211003',
            customerName: '鸿驰祥瑞物流有限公司',
            startLocation: '成都市',
            endLocation: '重庆市',
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