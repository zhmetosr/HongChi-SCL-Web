<template>
  <div class="international-tax">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>国际税务管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增税务规则
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="国家/地区">
          <el-input v-model="searchForm.country" placeholder="请输入国家/地区" clearable></el-input>
        </el-form-item>
        <el-form-item label="税务类型">
          <el-select v-model="searchForm.type" placeholder="请选择税务类型" clearable>
            <el-option label="关税" value="tariff"></el-option>
            <el-option label="增值税" value="vat"></el-option>
            <el-option label="消费税" value="consumption"></el-option>
            <el-option label="其他税" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="active"></el-option>
            <el-option label="禁用" value="inactive"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="taxRules" style="width: 100%">
        <el-table-column prop="id" label="规则ID" width="100"></el-table-column>
        <el-table-column prop="country" label="国家/地区" width="150"></el-table-column>
        <el-table-column prop="type" label="税务类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'tariff'">关税</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'vat'">增值税</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'consumption'">消费税</el-tag>
            <el-tag type="info" v-else>其他税</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="税率" width="100">
          <template slot-scope="scope">
            {{ scope.row.rate }}%
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="validFrom" label="生效日期" width="150"></el-table-column>
        <el-table-column prop="validTo" label="失效日期" width="150"></el-table-column>
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
        <el-form-item label="国家/地区" prop="country">
          <el-input v-model="form.country" placeholder="请输入国家/地区"></el-input>
        </el-form-item>
        <el-form-item label="税务类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择税务类型">
            <el-option label="关税" value="tariff"></el-option>
            <el-option label="增值税" value="vat"></el-option>
            <el-option label="消费税" value="consumption"></el-option>
            <el-option label="其他税" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税率" prop="rate">
          <el-input v-model.number="form.rate" type="number" placeholder="请输入税率"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="生效日期" prop="validFrom">
          <el-date-picker v-model="form.validFrom" type="date" placeholder="选择生效日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="validTo">
          <el-date-picker v-model="form.validTo" type="date" placeholder="选择失效日期" style="width: 100%"></el-date-picker>
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
  name: 'InternationalTax',
  data() {
    return {
      searchForm: {
        country: '',
        type: '',
        status: ''
      },
      taxRules: [
        {
          id: 1,
          country: '美国',
          type: 'tariff',
          rate: 5,
          description: '美国进口关税',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 2,
          country: '欧盟',
          type: 'vat',
          rate: 20,
          description: '欧盟增值税',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 3,
          country: '日本',
          type: 'tariff',
          rate: 3,
          description: '日本进口关税',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 4,
          country: '澳大利亚',
          type: 'vat',
          rate: 10,
          description: '澳大利亚 GST',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 5,
          country: '加拿大',
          type: 'consumption',
          rate: 5,
          description: '加拿大消费税',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
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
        country: '',
        type: '',
        rate: 0,
        description: '',
        validFrom: '',
        validTo: '',
        status: 'active'
      },
      rules: {
        country: [{ required: true, message: '请输入国家/地区', trigger: 'blur' }],
        type: [{ required: true, message: '请选择税务类型', trigger: 'change' }],
        rate: [{ required: true, message: '请输入税率', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        validFrom: [{ required: true, message: '请选择生效日期', trigger: 'change' }],
        validTo: [{ required: true, message: '请选择失效日期', trigger: 'change' }]
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
        country: '',
        type: '',
        status: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增税务规则';
      this.form = {
        id: '',
        country: '',
        type: '',
        rate: 0,
        description: '',
        validFrom: '',
        validTo: '',
        status: 'active'
      };
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑税务规则';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个税务规则吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.taxRules = this.taxRules.filter(item => item.id !== id);
        this.total = this.taxRules.length;
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
            const index = this.taxRules.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.taxRules[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newRule = {
              ...this.form,
              id: this.taxRules.length + 1
            };
            this.taxRules.push(newRule);
            this.total = this.taxRules.length;
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
.international-tax {
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