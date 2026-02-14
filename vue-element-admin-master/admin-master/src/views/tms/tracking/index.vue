<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>货物追踪</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="追踪编号">
          <el-input v-model="searchForm.trackingNo" placeholder="请输入追踪编号" clearable />
        </el-form-item>
        <el-form-item label="运单号">
          <el-input v-model="searchForm.waybillNo" placeholder="请输入运单号" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="在途" value="in_transit" />
            <el-option label="已送达" value="delivered" />
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
        <el-table-column min-width="180px" prop="trackingNo" label="追踪编号" />
        <el-table-column min-width="180px" prop="waybillNo" label="运单号" />
        <el-table-column min-width="180px" prop="customerName" label="客户名称" />
        <el-table-column min-width="150px" prop="location" label="当前位置" />
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="{
              in_transit: 'info',
              delivered: 'success',
              exception: 'danger'
            }[scope.row.status]">
              {{ {
                in_transit: '在途',
                delivered: '已送达',
                exception: '异常'
              }[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" prop="description" label="状态描述" />
        <el-table-column min-width="180px" prop="updatedAt" label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updatedAt | parseTime }}</span>
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
          <el-form-item label="追踪编号" prop="trackingNo">
            <el-input v-model="form.trackingNo" placeholder="请输入追踪编号" />
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
          <el-form-item label="当前位置" prop="location">
            <el-input v-model="form.location" placeholder="请输入当前位置" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="在途" value="in_transit" />
              <el-option label="已送达" value="delivered" />
              <el-option label="异常" value="exception" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入状态描述" type="textarea" />
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
  name: 'TrackingManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        trackingNo: [
          { required: true, message: '请输入追踪编号', trigger: 'blur' }
        ],
        waybillId: [
          { required: true, message: '请选择运单', trigger: 'change' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请输入当前位置', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入状态描述', trigger: 'blur' }
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
            trackingNo: 'TK20260211001',
            waybillNo: 'WB20260211001',
            customerName: '鸿驰祥瑞物流有限公司',
            location: '上海市浦东新区',
            status: 'delivered',
            description: '货物已成功送达',
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            trackingNo: 'TK20260211002',
            waybillNo: 'WB20260211002',
            customerName: '祥瑞供应链管理有限公司',
            location: '深圳市宝安区',
            status: 'in_transit',
            description: '货物正在派送中',
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            trackingNo: 'TK20260211003',
            waybillNo: 'WB20260211003',
            customerName: '鸿驰祥瑞物流有限公司',
            location: '重庆市渝北区',
            status: 'exception',
            description: '货物运输延迟',
            updatedAt: new Date().toISOString()
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