<template>
  <div class="green-esg">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>ESG报告管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增ESG报告
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="报告名称">
          <el-input v-model="searchForm.name" placeholder="请输入报告名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="报告类型">
          <el-select v-model="searchForm.type" placeholder="请选择报告类型" clearable>
            <el-option label="年度报告" value="annual"></el-option>
            <el-option label="季度报告" value="quarterly"></el-option>
            <el-option label="月度报告" value="monthly"></el-option>
            <el-option label="专项报告" value="special"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="已发布" value="published"></el-option>
            <el-option label="已归档" value="archived"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="esgList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="报告名称" width="200"></el-table-column>
        <el-table-column prop="type" label="报告类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'annual'">年度报告</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'quarterly'">季度报告</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'monthly'">月度报告</el-tag>
            <el-tag type="info" v-else>专项报告</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="period" label="报告周期" width="150"></el-table-column>
        <el-table-column prop="carbonEmission" label="碳排放量" width="120">
          <template slot-scope="scope">
            {{ scope.row.carbonEmission }}吨
          </template>
        </el-table-column>
        <el-table-column prop="reductionRate" label="减排率" width="100">
          <template slot-scope="scope">
            {{ scope.row.reductionRate }}%
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'draft'" type="info">草稿</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 'published'">已发布</el-tag>
            <el-tag type="danger" v-else>已归档</el-tag>
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
        <el-form-item label="报告名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入报告名称"></el-input>
        </el-form-item>
        <el-form-item label="报告类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择报告类型">
            <el-option label="年度报告" value="annual"></el-option>
            <el-option label="季度报告" value="quarterly"></el-option>
            <el-option label="月度报告" value="monthly"></el-option>
            <el-option label="专项报告" value="special"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告周期" prop="period">
          <el-input v-model="form.period" placeholder="请输入报告周期"></el-input>
        </el-form-item>
        <el-form-item label="碳排放量" prop="carbonEmission">
          <el-input v-model.number="form.carbonEmission" type="number" placeholder="请输入碳排放量"></el-input>
        </el-form-item>
        <el-form-item label="减排率" prop="reductionRate">
          <el-input v-model.number="form.reductionRate" type="number" placeholder="请输入减排率"></el-input>
        </el-form-item>
        <el-form-item label="报告内容" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入报告内容"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="已发布" value="published"></el-option>
            <el-option label="已归档" value="archived"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
    
    <!-- 查看对话框 -->
    <el-dialog
      title="ESG报告详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="报告名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="报告类型">
          <el-tag v-if="viewForm.type === 'annual'">年度报告</el-tag>
          <el-tag type="success" v-else-if="viewForm.type === 'quarterly'">季度报告</el-tag>
          <el-tag type="warning" v-else-if="viewForm.type === 'monthly'">月度报告</el-tag>
          <el-tag type="info" v-else>专项报告</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="报告周期">{{ viewForm.period }}</el-descriptions-item>
        <el-descriptions-item label="碳排放量">{{ viewForm.carbonEmission }}吨</el-descriptions-item>
        <el-descriptions-item label="减排率">{{ viewForm.reductionRate }}%</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'draft'" type="info">草稿</el-tag>
          <el-tag type="success" v-else-if="viewForm.status === 'published'">已发布</el-tag>
          <el-tag type="danger" v-else>已归档</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="报告内容" :span="2">{{ viewForm.content }}</el-descriptions-item>
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
  name: 'ESGReport',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        status: ''
      },
      esgList: [
        {
          id: 1,
          name: '2024年度ESG报告',
          type: 'annual',
          period: '2024年',
          carbonEmission: 10000,
          reductionRate: 15,
          status: 'published',
          content: '2024年度ESG报告内容...',
          createdAt: '2024-12-31',
          updatedAt: '2024-12-31'
        },
        {
          id: 2,
          name: '2024年第四季度ESG报告',
          type: 'quarterly',
          period: '2024年Q4',
          carbonEmission: 2500,
          reductionRate: 18,
          status: 'published',
          content: '2024年第四季度ESG报告内容...',
          createdAt: '2024-12-31',
          updatedAt: '2024-12-31'
        },
        {
          id: 3,
          name: '2024年12月ESG报告',
          type: 'monthly',
          period: '2024年12月',
          carbonEmission: 800,
          reductionRate: 20,
          status: 'published',
          content: '2024年12月ESG报告内容...',
          createdAt: '2024-12-31',
          updatedAt: '2024-12-31'
        },
        {
          id: 4,
          name: '绿色运输专项报告',
          type: 'special',
          period: '2024年',
          carbonEmission: 5000,
          reductionRate: 25,
          status: 'published',
          content: '绿色运输专项报告内容...',
          createdAt: '2024-12-31',
          updatedAt: '2024-12-31'
        },
        {
          id: 5,
          name: '2025年度ESG报告草稿',
          type: 'annual',
          period: '2025年',
          carbonEmission: 0,
          reductionRate: 0,
          status: 'draft',
          content: '2025年度ESG报告草稿...',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-01'
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
        period: '',
        carbonEmission: 0,
        reductionRate: 0,
        content: '',
        status: 'draft'
      },
      viewForm: {
        id: '',
        name: '',
        type: '',
        period: '',
        carbonEmission: 0,
        reductionRate: 0,
        content: '',
        status: 'draft',
        createdAt: '',
        updatedAt: ''
      },
      rules: {
        name: [{ required: true, message: '请输入报告名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择报告类型', trigger: 'change' }],
        period: [{ required: true, message: '请输入报告周期', trigger: 'blur' }],
        carbonEmission: [{ required: true, message: '请输入碳排放量', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        reductionRate: [{ required: true, message: '请输入减排率', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        content: [{ required: true, message: '请输入报告内容', trigger: 'blur' }]
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
      this.dialogTitle = '新增ESG报告';
      this.form = {
        id: '',
        name: '',
        type: '',
        period: '',
        carbonEmission: 0,
        reductionRate: 0,
        content: '',
        status: 'draft'
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑ESG报告';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个ESG报告吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.esgList = this.esgList.filter(item => item.id !== id);
        this.total = this.esgList.length;
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
            const index = this.esgList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.esgList[index] = {
                ...this.form,
                updatedAt: new Date().toISOString().split('T')[0]
              };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newReport = {
              ...this.form,
              id: this.esgList.length + 1,
              createdAt: new Date().toISOString().split('T')[0],
              updatedAt: new Date().toISOString().split('T')[0]
            };
            this.esgList.push(newReport);
            this.total = this.esgList.length;
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
.green-esg {
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