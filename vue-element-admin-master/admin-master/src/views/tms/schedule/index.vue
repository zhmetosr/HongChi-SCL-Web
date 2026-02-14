<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>调度管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="调度编号">
          <el-input v-model="searchForm.scheduleNo" placeholder="请输入调度编号" clearable />
        </el-form-item>
        <el-form-item label="运输任务编号">
          <el-input v-model="searchForm.transportNo" placeholder="请输入运输任务编号" clearable />
        </el-form-item>
        <el-form-item label="调度状态">
          <el-select v-model="searchForm.status" placeholder="请选择调度状态" clearable>
            <el-option label="待调度" value="pending" />
            <el-option label="已调度" value="scheduled" />
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
        <el-table-column min-width="180px" prop="scheduleNo" label="调度编号" />
        <el-table-column min-width="180px" prop="transportNo" label="运输任务编号" />
        <el-table-column min-width="180px" prop="waybillNo" label="运单号" />
        <el-table-column min-width="120px" prop="driverName" label="司机" />
        <el-table-column min-width="150px" prop="vehicleNo" label="车牌号" />
        <el-table-column min-width="120px" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="{
              pending: 'warning',
              scheduled: 'info',
              completed: 'success',
              cancelled: 'danger'
            }[scope.row.status]">
              {{ {
                pending: '待调度',
                scheduled: '已调度',
                completed: '已完成',
                cancelled: '已取消'
              }[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" prop="scheduleDate" label="调度日期">
          <template slot-scope="scope">
            <span>{{ scope.row.scheduleDate | parseTime('{y}-{m}-{d}') }}</span>
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
          <el-form-item label="调度编号" prop="scheduleNo">
            <el-input v-model="form.scheduleNo" placeholder="请输入调度编号" />
          </el-form-item>
          <el-form-item label="运输任务编号" prop="transportId">
            <el-select v-model="form.transportId" placeholder="请选择运输任务">
              <el-option label="TP20260211001" value="1" />
              <el-option label="TP20260211002" value="2" />
              <el-option label="TP20260211003" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="运单号" prop="waybillId">
            <el-select v-model="form.waybillId" placeholder="请选择运单">
              <el-option label="WB20260211001" value="1" />
              <el-option label="WB20260211002" value="2" />
              <el-option label="WB20260211003" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="司机" prop="driverId">
            <el-select v-model="form.driverId" placeholder="请选择司机">
              <el-option label="张三" value="1" />
              <el-option label="李四" value="2" />
              <el-option label="王五" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号" prop="vehicleNo">
            <el-input v-model="form.vehicleNo" placeholder="请输入车牌号" />
          </el-form-item>
          <el-form-item label="调度日期" prop="scheduleDate">
            <el-date-picker v-model="form.scheduleDate" type="date" placeholder="请选择调度日期" style="width: 100%" />
          </el-form-item>
          <el-form-item label="调度状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择调度状态">
              <el-option label="待调度" value="pending" />
              <el-option label="已调度" value="scheduled" />
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
  name: 'ScheduleManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        scheduleNo: [
          { required: true, message: '请输入调度编号', trigger: 'blur' }
        ],
        transportId: [
          { required: true, message: '请选择运输任务', trigger: 'change' }
        ],
        waybillId: [
          { required: true, message: '请选择运单', trigger: 'change' }
        ],
        driverId: [
          { required: true, message: '请选择司机', trigger: 'change' }
        ],
        vehicleNo: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        scheduleDate: [
          { required: true, message: '请选择调度日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择调度状态', trigger: 'change' }
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
            scheduleNo: 'SC20260211001',
            transportNo: 'TP20260211001',
            waybillNo: 'WB20260211001',
            driverName: '张三',
            vehicleNo: '京A12345',
            status: 'completed',
            scheduleDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            scheduleNo: 'SC20260211002',
            transportNo: 'TP20260211002',
            waybillNo: 'WB20260211002',
            driverName: '李四',
            vehicleNo: '粤A67890',
            status: 'scheduled',
            scheduleDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            scheduleNo: 'SC20260211003',
            transportNo: 'TP20260211003',
            waybillNo: 'WB20260211003',
            driverName: '王五',
            vehicleNo: '川A54321',
            status: 'pending',
            scheduleDate: new Date().toISOString(),
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