<template>
  <div class="product-master-data">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>产品主数据管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增产品
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="产品编码">
          <el-input v-model="searchForm.code" placeholder="请输入产品编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.name" placeholder="请输入产品名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="searchForm.type" placeholder="请选择产品类型" clearable>
            <el-option label="物流服务" value="logistics"></el-option>
            <el-option label="增值服务" value="value_added"></el-option>
            <el-option label="其他服务" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="productList" style="width: 100%">
        <el-table-column prop="code" label="产品编码" width="120"></el-table-column>
        <el-table-column prop="name" label="产品名称" width="180"></el-table-column>
        <el-table-column prop="type" label="产品类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'logistics'">物流服务</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'value_added'">增值服务</el-tag>
            <el-tag type="info" v-else>其他服务</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="产品描述"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'active'" type="success">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="产品编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入产品编码"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择产品类型">
            <el-option label="物流服务" value="logistics"></el-option>
            <el-option label="增值服务" value="value_added"></el-option>
            <el-option label="其他服务" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入产品描述"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" active-value="active" inactive-value="inactive"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MDMProduct',
  data() {
    return {
      searchForm: {
        code: '',
        name: '',
        type: ''
      },
      productList: [
        {
          id: 1,
          code: 'P001',
          name: '国内零担运输',
          type: 'logistics',
          description: '国内公路零担运输服务',
          status: 'active'
        },
        {
          id: 2,
          code: 'P002',
          name: '国内整车运输',
          type: 'logistics',
          description: '国内公路整车运输服务',
          status: 'active'
        },
        {
          id: 3,
          code: 'P003',
          name: '国际海运',
          type: 'logistics',
          description: '国际海运集装箱运输服务',
          status: 'active'
        },
        {
          id: 4,
          code: 'P004',
          name: '报关服务',
          type: 'value_added',
          description: '进出口货物报关服务',
          status: 'active'
        },
        {
          id: 5,
          code: 'P005',
          name: '保险服务',
          type: 'value_added',
          description: '货物运输保险服务',
          status: 'active'
        }
      ],
      total: 5,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        code: '',
        name: '',
        type: '',
        description: '',
        status: 'active'
      },
      rules: {
        code: [{ required: true, message: '请输入产品编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择产品类型', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSearch() {
      // 模拟搜索功能
      this.$message.success('搜索功能已触发');
    },
    resetForm() {
      this.searchForm = {
        code: '',
        name: '',
        type: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增产品';
      this.form = {
        id: '',
        code: '',
        name: '',
        type: '',
        description: '',
        status: 'active'
      };
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑产品';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个产品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.productList = this.productList.filter(item => item.id !== id);
        this.total = this.productList.length;
        this.$message.success('删除成功');
      }).catch(() => {
        this.$message.info('取消删除');
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑操作
            const index = this.productList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.productList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newProduct = {
              ...this.form,
              id: this.productList.length + 1
            };
            this.productList.push(newProduct);
            this.total = this.productList.length;
            this.$message.success('新增成功');
          }
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
.product-master-data {
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
</style>