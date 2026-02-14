<template>
  <div class="legal-compliance">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>合规管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增合规规则
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="规则编号">
          <el-input v-model="searchForm.code" placeholder="请输入规则编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="规则名称">
          <el-input v-model="searchForm.name" placeholder="请输入规则名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="规则类型">
          <el-select v-model="searchForm.type" placeholder="请选择规则类型" clearable>
            <el-option label="国际物流" value="international"></el-option>
            <el-option label="国内物流" value="domestic"></el-option>
            <el-option label="行业专属" value="industry"></el-option>
            <el-option label="其他规则" value="other"></el-option>
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
      
      <el-table :data="complianceList" style="width: 100%">
        <el-table-column prop="code" label="规则编号" width="120"></el-table-column>
        <el-table-column prop="name" label="规则名称" width="180"></el-table-column>
        <el-table-column prop="type" label="规则类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'international'">国际物流</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'domestic'">国内物流</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'industry'">行业专属</el-tag>
            <el-tag type="info" v-else>其他规则</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="规则描述"></el-table-column>
        <el-table-column prop="applicableScope" label="适用范围" width="150"></el-table-column>
        <el-table-column prop="effectiveDate" label="生效日期" width="150"></el-table-column>
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
      width="600px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="规则编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入规则编号"></el-input>
        </el-form-item>
        <el-form-item label="规则名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入规则名称"></el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择规则类型">
            <el-option label="国际物流" value="international"></el-option>
            <el-option label="国内物流" value="domestic"></el-option>
            <el-option label="行业专属" value="industry"></el-option>
            <el-option label="其他规则" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入规则描述"></el-input>
        </el-form-item>
        <el-form-item label="适用范围" prop="applicableScope">
          <el-input v-model="form.applicableScope" placeholder="请输入适用范围"></el-input>
        </el-form-item>
        <el-form-item label="生效日期" prop="effectiveDate">
          <el-date-picker v-model="form.effectiveDate" type="date" placeholder="选择生效日期" style="width: 100%"></el-date-picker>
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
  name: 'LegalCompliance',
  data() {
    return {
      searchForm: {
        code: '',
        name: '',
        type: '',
        status: ''
      },
      complianceList: [
        {
          id: 1,
          code: 'CMP20240101',
          name: '国际TIR运输规则',
          type: 'international',
          description: '国际道路运输TIR公约相关规则',
          applicableScope: '国际物流',
          effectiveDate: '2024-01-01',
          status: 'active'
        },
        {
          id: 2,
          code: 'CMP20240102',
          name: '国内物流安全管理规则',
          type: 'domestic',
          description: '国内物流运输安全管理相关规则',
          applicableScope: '国内物流',
          effectiveDate: '2024-01-01',
          status: 'active'
        },
        {
          id: 3,
          code: 'CMP20240103',
          name: '危化品运输规则',
          type: 'industry',
          description: '危险化学品运输相关规则',
          applicableScope: '危化品物流',
          effectiveDate: '2024-01-01',
          status: 'active'
        },
        {
          id: 4,
          code: 'CMP20240104',
          name: '冷链物流规则',
          type: 'industry',
          description: '冷链物流运输相关规则',
          applicableScope: '冷链物流',
          effectiveDate: '2024-01-01',
          status: 'active'
        },
        {
          id: 5,
          code: 'CMP20240105',
          name: '快递服务标准',
          type: 'domestic',
          description: '快递服务行业标准相关规则',
          applicableScope: '快递服务',
          effectiveDate: '2024-01-01',
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
        applicableScope: '',
        effectiveDate: '',
        status: 'active'
      },
      rules: {
        code: [{ required: true, message: '请输入规则编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择规则类型', trigger: 'change' }],
        description: [{ required: true, message: '请输入规则描述', trigger: 'blur' }],
        applicableScope: [{ required: true, message: '请输入适用范围', trigger: 'blur' }],
        effectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'change' }]
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
        type: '',
        status: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增合规规则';
      this.form = {
        id: '',
        code: '',
        name: '',
        type: '',
        description: '',
        applicableScope: '',
        effectiveDate: '',
        status: 'active'
      };
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑合规规则';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个合规规则吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.complianceList = this.complianceList.filter(item => item.id !== id);
        this.total = this.complianceList.length;
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
            const index = this.complianceList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.complianceList[index] = { ...this.form };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newRule = {
              ...this.form,
              id: this.complianceList.length + 1
            };
            this.complianceList.push(newRule);
            this.total = this.complianceList.length;
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
.legal-compliance {
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