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
        <el-form-item label="专线名称">
          <el-input v-model="searchForm.name" placeholder="请输入专线名称" clearable />
        </el-form-item>
        <el-form-item label="起点城市">
          <el-input v-model="searchForm.startCity" placeholder="请输入起点城市" clearable />
        </el-form-item>
        <el-form-item label="终点城市">
          <el-input v-model="searchForm.endCity" placeholder="请输入终点城市" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="inactive" />
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
      <el-table-column min-width="150px" prop="name" label="专线名称" />
      <el-table-column min-width="150px" prop="startCity" label="起点城市" />
      <el-table-column min-width="150px" prop="endCity" label="终点城市" />
      <el-table-column min-width="120px" prop="distance" label="距离(km)" />
      <el-table-column min-width="120px" prop="pricePerKm" label="单价(元/km)">
        <template slot-scope="scope">
          <span>{{ scope.row.pricePerKm.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '启用' : '禁用' }}
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
        <el-form-item label="专线名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入专线名称" />
        </el-form-item>
        <el-form-item label="起点城市" prop="startCity">
          <el-input v-model="form.startCity" placeholder="请输入起点城市" />
        </el-form-item>
        <el-form-item label="终点城市" prop="endCity">
          <el-input v-model="form.endCity" placeholder="请输入终点城市" />
        </el-form-item>
        <el-form-item label="距离(km)" prop="distance">
          <el-input v-model.number="form.distance" placeholder="请输入距离" type="number" />
        </el-form-item>
        <el-form-item label="单价(元/km)" prop="pricePerKm">
          <el-input v-model.number="form.pricePerKm" placeholder="请输入单价" type="number" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="inactive" />
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
  name: 'LineManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入专线名称', trigger: 'blur' }
        ],
        startCity: [
          { required: true, message: '请输入起点城市', trigger: 'blur' }
        ],
        endCity: [
          { required: true, message: '请输入终点城市', trigger: 'blur' }
        ],
        distance: [
          { required: true, message: '请输入距离', trigger: 'blur' },
          { type: 'number', message: '请输入有效的距离', trigger: 'blur' }
        ],
        pricePerKm: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          { type: 'number', message: '请输入有效的单价', trigger: 'blur' }
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
            name: '北京-上海专线',
            startCity: '北京市',
            endCity: '上海市',
            distance: 1318,
            pricePerKm: 1.5,
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: '广州-深圳专线',
            startCity: '广州市',
            endCity: '深圳市',
            distance: 120,
            pricePerKm: 1.2,
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: '成都-重庆专线',
            startCity: '成都市',
            endCity: '重庆市',
            distance: 308,
            pricePerKm: 1.0,
            status: 'inactive',
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