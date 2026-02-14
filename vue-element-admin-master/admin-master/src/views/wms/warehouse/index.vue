<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>仓库管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="仓库编号">
          <el-input v-model="searchForm.warehouseNo" placeholder="请输入仓库编号" clearable />
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-input v-model="searchForm.name" placeholder="请输入仓库名称" clearable />
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
        <el-table-column min-width="150px" prop="warehouseNo" label="仓库编号" />
        <el-table-column min-width="180px" prop="name" label="仓库名称" />
        <el-table-column min-width="150px" prop="type" label="仓库类型">
          <template slot-scope="scope">
            <el-tag :type="{
              general: 'info',
              cold: 'warning',
              dangerous: 'danger'
            }[scope.row.type]">
              {{ {
                general: '普通仓库',
                cold: '冷链仓库',
                dangerous: '危险品仓库'
              }[scope.row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" prop="address" label="地址" />
        <el-table-column min-width="120px" prop="capacity" label="容量(平方米)" />
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
          <el-form-item label="仓库编号" prop="warehouseNo">
            <el-input v-model="form.warehouseNo" placeholder="请输入仓库编号" />
          </el-form-item>
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入仓库名称" />
          </el-form-item>
          <el-form-item label="仓库类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择仓库类型">
              <el-option label="普通仓库" value="general" />
              <el-option label="冷链仓库" value="cold" />
              <el-option label="危险品仓库" value="dangerous" />
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址" type="textarea" />
          </el-form-item>
          <el-form-item label="容量(平方米)" prop="capacity">
            <el-input v-model.number="form.capacity" placeholder="请输入容量" type="number" />
          </el-form-item>
          <el-form-item label="负责人" prop="manager">
            <el-input v-model="form.manager" placeholder="请输入负责人" />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" />
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
  name: 'WarehouseManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        warehouseNo: [
          { required: true, message: '请输入仓库编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择仓库类型', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '请输入容量', trigger: 'blur' },
          { type: 'number', message: '请输入有效的容量', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
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
            warehouseNo: 'WH20260211001',
            name: '北京总部仓库',
            type: 'general',
            address: '北京市朝阳区建国路88号',
            capacity: 5000,
            manager: '张经理',
            phone: '13800138001',
            status: 'enabled',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            warehouseNo: 'WH20260211002',
            name: '上海分仓',
            type: 'general',
            address: '上海市浦东新区张江高科技园区',
            capacity: 3000,
            manager: '李经理',
            phone: '13900139001',
            status: 'enabled',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            warehouseNo: 'WH20260211003',
            name: '广州冷链仓库',
            type: 'cold',
            address: '广州市白云区太和镇',
            capacity: 2000,
            manager: '王经理',
            phone: '13700137001',
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