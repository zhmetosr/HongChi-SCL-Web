<template>
  <div class="price-master-data">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>价格主数据管理</span>
          <el-button type="primary" @click="handleAdd" size="small">
            <i class="el-icon-plus"></i> 新增价格
          </el-button>
        </div>
      </template>
      
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="价格编码">
          <el-input v-model="searchForm.code" placeholder="请输入价格编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-select v-model="searchForm.productId" placeholder="请选择产品" clearable>
            <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格类型">
          <el-select v-model="searchForm.type" placeholder="请选择价格类型" clearable>
            <el-option label="标准价" value="standard"></el-option>
            <el-option label="促销价" value="promotion"></el-option>
            <el-option label="协议价" value="agreement"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="priceList" style="width: 100%">
        <el-table-column prop="code" label="价格编码" width="120"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
        <el-table-column prop="type" label="价格类型" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 'standard'">标准价</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type === 'promotion'">促销价</el-tag>
            <el-tag type="success" v-else>协议价</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
          <template slot-scope="scope">
            ¥{{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="currency" label="货币" width="100"></el-table-column>
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
        <el-form-item label="价格编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入价格编码"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productId">
          <el-select v-model="form.productId" placeholder="请选择产品">
            <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择价格类型">
            <el-option label="标准价" value="standard"></el-option>
            <el-option label="促销价" value="promotion"></el-option>
            <el-option label="协议价" value="agreement"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price" type="number" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="货币" prop="currency">
          <el-select v-model="form.currency" placeholder="请选择货币">
            <el-option label="人民币" value="CNY"></el-option>
            <el-option label="美元" value="USD"></el-option>
            <el-option label="欧元" value="EUR"></el-option>
          </el-select>
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
  name: 'MDMPrice',
  data() {
    return {
      searchForm: {
        code: '',
        productId: '',
        type: ''
      },
      products: [
        { id: 1, name: '国内零担运输' },
        { id: 2, name: '国内整车运输' },
        { id: 3, name: '国际海运' },
        { id: 4, name: '报关服务' },
        { id: 5, name: '保险服务' }
      ],
      priceList: [
        {
          id: 1,
          code: 'PR001',
          productId: 1,
          productName: '国内零担运输',
          type: 'standard',
          price: 100.00,
          currency: 'CNY',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 2,
          code: 'PR002',
          productId: 2,
          productName: '国内整车运输',
          type: 'standard',
          price: 2000.00,
          currency: 'CNY',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 3,
          code: 'PR003',
          productId: 3,
          productName: '国际海运',
          type: 'standard',
          price: 500.00,
          currency: 'USD',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 4,
          code: 'PR004',
          productId: 4,
          productName: '报关服务',
          type: 'standard',
          price: 200.00,
          currency: 'CNY',
          validFrom: '2024-01-01',
          validTo: '2024-12-31',
          status: 'active'
        },
        {
          id: 5,
          code: 'PR005',
          productId: 5,
          productName: '保险服务',
          type: 'standard',
          price: 50.00,
          currency: 'CNY',
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
        code: '',
        productId: '',
        type: '',
        price: 0,
        currency: 'CNY',
        validFrom: '',
        validTo: '',
        status: 'active'
      },
      rules: {
        code: [{ required: true, message: '请输入价格编码', trigger: 'blur' }],
        productId: [{ required: true, message: '请选择产品', trigger: 'change' }],
        type: [{ required: true, message: '请选择价格类型', trigger: 'change' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
        currency: [{ required: true, message: '请选择货币', trigger: 'change' }],
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
        code: '',
        productId: '',
        type: ''
      };
    },
    handleAdd() {
      this.dialogTitle = '新增价格';
      this.form = {
        id: '',
        code: '',
        productId: '',
        type: '',
        price: 0,
        currency: 'CNY',
        validFrom: '',
        validTo: '',
        status: 'active'
      };
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑价格';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.$confirm('确定要删除这个价格吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.priceList = this.priceList.filter(item => item.id !== id);
        this.total = this.priceList.length;
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
            const index = this.priceList.findIndex(item => item.id === this.form.id);
            if (index !== -1) {
              const product = this.products.find(p => p.id === this.form.productId);
              this.priceList[index] = {
                ...this.form,
                productName: product ? product.name : ''
              };
            }
            this.$message.success('编辑成功');
          } else {
            // 新增操作
            const product = this.products.find(p => p.id === this.form.productId);
            const newPrice = {
              ...this.form,
              id: this.priceList.length + 1,
              productName: product ? product.name : ''
            };
            this.priceList.push(newPrice);
            this.total = this.priceList.length;
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
.price-master-data {
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