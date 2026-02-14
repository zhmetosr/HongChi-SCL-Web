<template>
  <div class="ai-models">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>模型管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增模型
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="模型名称">
          <el-input v-model="searchForm.name" placeholder="请输入模型名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="模型类型">
          <el-select v-model="searchForm.type" placeholder="请选择模型类型" clearable>
            <el-option label="预测模型" value="prediction"></el-option>
            <el-option label="分类模型" value="classification"></el-option>
            <el-option label="识别模型" value="recognition"></el-option>
            <el-option label="其他模型" value="other"></el-option>
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
      
      <el-table :data="modelsList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="模型名称" width="180"></el-table-column>
        <el-table-column prop="type" label="模型类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'prediction'">预测模型</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'classification'">分类模型</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'recognition'">识别模型</el-tag>
            <el-tag type="info" v-else>其他模型</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="version" label="版本" width="100"></el-table-column>
        <el-table-column prop="description" label="模型描述"></el-table-column>
        <el-table-column prop="accuracy" label="准确率" width="100">
          <template slot-scope="scope">
            {{ scope.row.accuracy }}%
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'active'" type="success">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button type="success" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
        <el-form-item label="模型名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入模型名称"></el-input>
        </el-form-item>
        <el-form-item label="模型类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择模型类型">
            <el-option label="预测模型" value="prediction"></el-option>
            <el-option label="分类模型" value="classification"></el-option>
            <el-option label="识别模型" value="recognition"></el-option>
            <el-option label="其他模型" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="form.version" placeholder="请输入版本"></el-input>
        </el-form-item>
        <el-form-item label="模型描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入模型描述"></el-input>
        </el-form-item>
        <el-form-item label="准确率" prop="accuracy">
          <el-input v-model.number="form.accuracy" type="number" placeholder="请输入准确率"></el-input>
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
    
    <!-- 查看对话框 -->
    <el-dialog
      title="模型详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="模型名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="模型类型">
          <el-tag v-if="viewForm.type === 'prediction'">预测模型</el-tag>
          <el-tag type="success" v-else-if="viewForm.type === 'classification'">分类模型</el-tag>
          <el-tag type="warning" v-else-if="viewForm.type === 'recognition'">识别模型</el-tag>
          <el-tag type="info" v-else>其他模型</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="版本">{{ viewForm.version }}</el-descriptions-item>
        <el-descriptions-item label="准确率">{{ viewForm.accuracy }}%</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'active'" type="success">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="模型描述" :span="2">{{ viewForm.description }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ viewForm.createdAt }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ viewForm.updatedAt }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AIModels',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        status: ''
      },
      modelsList: [
        {
          id: 1,
          name: '运输需求预测模型',
          type: 'prediction',
          version: '1.0.0',
          description: '基于历史数据预测运输需求',
          accuracy: 92,
          status: 'active',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 2,
          name: '客户分类模型',
          type: 'classification',
          version: '1.0.0',
          description: '基于客户特征进行分类',
          accuracy: 88,
          status: 'active',
          createdAt: '2024-01-02',
          updatedAt: '2024-01-02'
        },
        {
          id: 3,
          name: '货物识别模型',
          type: 'recognition',
          version: '1.0.0',
          description: '基于图像识别货物类型',
          accuracy: 95,
          status: 'active',
          createdAt: '2024-01-03',
          updatedAt: '2024-01-03'
        },
        {
          id: 4,
          name: '风险评估模型',
          type: 'classification',
          version: '1.0.0',
          description: '评估运输风险等级',
          accuracy: 85,
          status: 'active',
          createdAt: '2024-01-04',
          updatedAt: '2024-01-04'
        },
        {
          id: 5,
          name: '路线优化模型',
          type: 'prediction',
          version: '1.0.0',
          description: '优化运输路线',
          accuracy: 90,
          status: 'active',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-05'
        }
      ],
      total: 5,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      viewDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        name: '',
        type: '',
        version: '',
        description: '',
        accuracy: 0,
        status: 'active'
      },
      viewForm: {
        id: '',
        name: '',
        type: '',
        version: '',
        description: '',
        accuracy: 0,
        status: 'active',
        createdAt: '',
        updatedAt: ''
      },
      rules: {
        name: [{ required: true, message: '请输入模型名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择模型类型', trigger: 'change' }],
        version: [{ required: true, message: '请输入版本', trigger: 'blur' }],
        description: [{ required: true, message: '请输入模型描述', trigger: 'blur' }],
        accuracy: [{ required: true, message: '请输入准确率', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }]
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
        name: '',
        type: '',
        status: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增模型';
      this.form = {
        id: '',
        name: '',
        type: '',
        version: '',
        description: '',
        accuracy: 0,
        status: 'active'
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑模型';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个模型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.modelsList = this.modelsList.filter(item => item.id !== id);
        this.total = this.modelsList.length;
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
            const index = this.modelsList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.modelsList[index] = {
                ...this.form,
                updatedAt: new Date().toISOString().split('T')[0]
              };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newModel = {
              ...this.form,
              id: this.modelsList.length + 1,
              createdAt: new Date().toISOString().split('T')[0],
              updatedAt: new Date().toISOString().split('T')[0]
            };
            this.modelsList.push(newModel);
            this.total = this.modelsList.length;
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
.ai-models {
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