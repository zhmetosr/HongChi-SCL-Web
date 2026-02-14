<template>
  <div class="crud-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>供应商管理</span>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="供应商名称">
          <el-input v-model="searchForm.name" placeholder="请输入供应商名称" clearable />
        </el-form-item>
        <el-form-item label="供应商类型">
          <el-select v-model="searchForm.type" placeholder="请选择供应商类型" clearable>
            <el-option label="物流服务商" value="logistics" />
            <el-option label="仓储服务商" value="warehousing" />
            <el-option label="运输服务商" value="transport" />
          </el-select>
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
        <el-table-column min-width="180px" prop="name" label="供应商名称" />
        <el-table-column min-width="150px" prop="type" label="供应商类型">
          <template slot-scope="scope">
            <el-tag :type="{
              logistics: 'info',
              warehousing: 'success',
              transport: 'warning'
            }[scope.row.type]">
              {{ {
                logistics: '物流服务商',
                warehousing: '仓储服务商',
                transport: '运输服务商'
              }[scope.row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" prop="contact" label="联系人" />
        <el-table-column min-width="150px" prop="phone" label="联系电话" />
        <el-table-column min-width="180px" prop="email" label="邮箱" />
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
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入供应商名称" />
          </el-form-item>
          <el-form-item label="供应商类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择供应商类型">
              <el-option label="物流服务商" value="logistics" />
              <el-option label="仓储服务商" value="warehousing" />
              <el-option label="运输服务商" value="transport" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址" type="textarea" />
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
  name: 'SupplierManagement',
  mixins: [crud],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择供应商类型', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
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
            name: '顺丰速运有限公司',
            type: 'logistics',
            contact: '王经理',
            phone: '13800138001',
            email: 'wang@sf-express.com',
            address: '深圳市南山区科技园',
            status: 'enabled',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: '京东物流有限公司',
            type: 'logistics',
            contact: '李总',
            phone: '13900139001',
            email: 'li@jd.com',
            address: '北京市大兴区亦庄',
            status: 'enabled',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: '三通一达物流联盟',
            type: 'transport',
            contact: '张经理',
            phone: '13700137001',
            email: 'zhang@sanyida.com',
            address: '上海市青浦区华新镇',
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