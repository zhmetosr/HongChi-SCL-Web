<template>
  <div class="green-optimization">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>绿色优化管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增优化方案
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="方案名称">
          <el-input v-model="searchForm.name" placeholder="请输入方案名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="优化类型">
          <el-select v-model="searchForm.type" placeholder="请选择优化类型" clearable>
            <el-option label="路线优化" value="route"></el-option>
            <el-option label="车辆优化" value="vehicle"></el-option>
            <el-option label="仓储优化" value="warehouse"></el-option>
            <el-option label="其他优化" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="实施中" value="implementing"></el-option>
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="已归档" value="archived"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="optimizationList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="方案名称" width="200"></el-table-column>
        <el-table-column prop="type" label="优化类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'route'">路线优化</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'vehicle'">车辆优化</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'warehouse'">仓储优化</el-tag>
            <el-tag type="info" v-else>其他优化</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="expectedReduction" label="预计减排量" width="120">
          <template slot-scope="scope">
            {{ scope.row.expectedReduction }}吨
          </template>
        </el-table-column>
        <el-table-column prop="expectedCost" label="预计成本" width="120">
          <template slot-scope="scope">
            ¥{{ scope.row.expectedCost }}
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="开始日期" width="150"></el-table-column>
        <el-table-column prop="endDate" label="结束日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'draft'" type="info">草稿</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 'implementing'">实施中</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 'completed'">已完成</el-tag>
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
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入方案名称"></el-input>
        </el-form-item>
        <el-form-item label="优化类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择优化类型">
            <el-option label="路线优化" value="route"></el-option>
            <el-option label="车辆优化" value="vehicle"></el-option>
            <el-option label="仓储优化" value="warehouse"></el-option>
            <el-option label="其他优化" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计减排量" prop="expectedReduction">
          <el-input v-model.number="form.expectedReduction" type="number" placeholder="请输入预计减排量"></el-input>
        </el-form-item>
        <el-form-item label="预计成本" prop="expectedCost">
          <el-input v-model.number="form.expectedCost" type="number" placeholder="请输入预计成本"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker v-model="form.endDate" type="date" placeholder="选择结束日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="方案描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入方案描述"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="实施中" value="implementing"></el-option>
            <el-option label="已完成" value="completed"></el-option>
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
      title="绿色优化方案详情"
      :visible.sync="viewDialogVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="方案名称">{{ viewForm.name }}</el-descriptions-item>
        <el-descriptions-item label="优化类型">
          <el-tag v-if="viewForm.type === 'route'">路线优化</el-tag>
          <el-tag type="success" v-else-if="viewForm.type === 'vehicle'">车辆优化</el-tag>
          <el-tag type="warning" v-else-if="viewForm.type === 'warehouse'">仓储优化</el-tag>
          <el-tag type="info" v-else>其他优化</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="预计减排量">{{ viewForm.expectedReduction }}吨</el-descriptions-item>
        <el-descriptions-item label="预计成本">¥{{ viewForm.expectedCost }}</el-descriptions-item>
        <el-descriptions-item label="开始日期">{{ viewForm.startDate }}</el-descriptions-item>
        <el-descriptions-item label="结束日期">{{ viewForm.endDate }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="viewForm.status === 'draft'" type="info">草稿</el-tag>
          <el-tag type="warning" v-else-if="viewForm.status === 'implementing'">实施中</el-tag>
          <el-tag type="success" v-else-if="viewForm.status === 'completed'">已完成</el-tag>
          <el-tag type="danger" v-else>已归档</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="方案描述" :span="2">{{ viewForm.description }}</el-descriptions-item>
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
  name: 'GreenOptimization',
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        status: ''
      },
      optimizationList: [
        {
          id: 1,
          name: '北京-上海路线优化',
          type: 'route',
          expectedReduction: 100,
          expectedCost: 50000,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          status: 'completed',
          description: '优化北京到上海的运输路线，减少碳排放',
          createdAt: '2023-12-01',
          updatedAt: '2024-01-31'
        },
        {
          id: 2,
          name: '新能源车辆替换',
          type: 'vehicle',
          expectedReduction: 500,
          expectedCost: 2000000,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          status: 'implementing',
          description: '逐步替换传统燃油车辆为新能源车辆',
          createdAt: '2023-12-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 3,
          name: '智能仓储优化',
          type: 'warehouse',
          expectedReduction: 50,
          expectedCost: 100000,
          startDate: '2024-01-01',
          endDate: '2024-03-31',
          status: 'implementing',
          description: '优化仓储布局，减少能源消耗',
          createdAt: '2023-12-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 4,
          name: '包装材料优化',
          type: 'other',
          expectedReduction: 20,
          expectedCost: 10000,
          startDate: '2024-01-01',
          endDate: '2024-02-28',
          status: 'completed',
          description: '使用可降解包装材料，减少环境污染',
          createdAt: '2023-12-01',
          updatedAt: '2024-02-28'
        },
        {
          id: 5,
          name: '绿色驾驶培训',
          type: 'other',
          expectedReduction: 30,
          expectedCost: 5000,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          status: 'completed',
          description: '对司机进行绿色驾驶培训，减少燃油消耗',
          createdAt: '2023-12-01',
          updatedAt: '2024-01-31'
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
        expectedReduction: 0,
        expectedCost: 0,
        startDate: '',
        endDate: '',
        description: '',
        status: 'draft'
      },
      viewForm: {
        id: '',
        name: '',
        type: '',
        expectedReduction: 0,
        expectedCost: 0,
        startDate: '',
        endDate: '',
        description: '',
        status: 'draft',
        createdAt: '',
        updatedAt: ''
      },
      rules: {
        name: [{ required: true, message: '请输入方案名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择优化类型', trigger: 'change' }],
        expectedReduction: [{ required: true, message: '请输入预计减排量', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        expectedCost: [{ required: true, message: '请输入预计成本', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        description: [{ required: true, message: '请输入方案描述', trigger: 'blur' }]
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
      this.dialogTitle = '新增绿色优化方案';
      this.form = {
        id: '',
        name: '',
        type: '',
        expectedReduction: 0,
        expectedCost: 0,
        startDate: '',
        endDate: '',
        description: '',
        status: 'draft'
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.viewForm = { ...row };
      this.viewDialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑绿色优化方案';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个绿色优化方案吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.optimizationList = this.optimizationList.filter(item => item.id !== id);
        this.total = this.optimizationList.length;
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
            const index = this.optimizationList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              this.optimizationList[index] = {
                ...this.form,
                updatedAt: new Date().toISOString().split('T')[0]
              };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const newOptimization = {
              ...this.form,
              id: this.optimizationList.length + 1,
              createdAt: new Date().toISOString().split('T')[0],
              updatedAt: new Date().toISOString().split('T')[0]
            };
            this.optimizationList.push(newOptimization);
            this.total = this.optimizationList.length;
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
.green-optimization {
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