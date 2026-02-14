<template>
  <div class="green-carbon-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="统计期间">
          <el-date-picker
            v-model="searchForm.period"
            type="month"
            placeholder="选择月份"
            format="yyyy-MM"
            value-format="yyyy-MM"
            clearable
          />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="运输方式">
          <el-select v-model="searchForm.transportType" placeholder="请选择运输方式" clearable>
            <el-option label="公路运输" value="road" />
            <el-option label="铁路运输" value="railway" />
            <el-option label="航空运输" value="air" />
            <el-option label="水路运输" value="water" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="success" @click="handleAdd">新增碳足迹记录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="data-card">
      <div class="stats-container">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">总碳排放量</div>
              <div class="stat-value">{{ totalCarbonEmission }} kg</div>
              <div class="stat-change" :class="{ positive: carbonChange >= 0 }">
                {{ carbonChange >= 0 ? '+' : '' }}{{ carbonChange }}% 较上月
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">平均碳排放强度</div>
              <div class="stat-value">{{ avgCarbonIntensity }} kg/km</div>
              <div class="stat-change" :class="{ positive: intensityChange >= 0 }">
                {{ intensityChange >= 0 ? '+' : '' }}{{ intensityChange }}% 较上月
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">碳减排量</div>
              <div class="stat-value">{{ carbonReduction }} kg</div>
              <div class="stat-change positive">+12.5% 较上月</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-title">新能源车辆占比</div>
              <div class="stat-value">{{ newEnergyRatio }}%</div>
              <div class="stat-change positive">+3.2% 较上月</div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-table :data="carbonList" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="period" label="统计期间" width="120" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="origin" label="起始地" width="120" />
        <el-table-column prop="destination" label="目的地" width="120" />
        <el-table-column prop="distance" label="运输距离" width="100">
          <template slot-scope="scope">
            {{ scope.row.distance }} km
          </template>
        </el-table-column>
        <el-table-column prop="transportType" label="运输方式" width="120">
          <template slot-scope="scope">
            {{ getTransportTypeText(scope.row.transportType) }}
          </template>
        </el-table-column>
        <el-table-column prop="carbonEmission" label="碳排放量" width="120">
          <template slot-scope="scope">
            {{ scope.row.carbonEmission }} kg
          </template>
        </el-table-column>
        <el-table-column prop="carbonIntensity" label="排放强度" width="120">
          <template slot-scope="scope">
            {{ scope.row.carbonIntensity }} kg/km
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-show="total > 0"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="统计期间" prop="period">
          <el-date-picker
            v-model="form.period"
            type="month"
            placeholder="选择月份"
            format="yyyy-MM"
            value-format="yyyy-MM"
          />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="起始地" prop="origin">
          <el-input v-model="form.origin" placeholder="请输入起始地" />
        </el-form-item>
        <el-form-item label="目的地" prop="destination">
          <el-input v-model="form.destination" placeholder="请输入目的地" />
        </el-form-item>
        <el-form-item label="运输距离" prop="distance">
          <el-input v-model="form.distance" placeholder="请输入运输距离" type="number" />
        </el-form-item>
        <el-form-item label="运输方式" prop="transportType">
          <el-select v-model="form.transportType" placeholder="请选择运输方式">
            <el-option label="公路运输" value="road" />
            <el-option label="铁路运输" value="railway" />
            <el-option label="航空运输" value="air" />
            <el-option label="水路运输" value="water" />
          </el-select>
        </el-form-item>
        <el-form-item label="货物重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入货物重量" type="number" />
        </el-form-item>
        <el-form-item label="碳排放量" prop="carbonEmission">
          <el-input v-model="form.carbonEmission" placeholder="自动计算" type="number" readonly />
        </el-form-item>
        <el-form-item label="排放强度" prop="carbonIntensity">
          <el-input v-model="form.carbonIntensity" placeholder="自动计算" type="number" readonly />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog title="碳足迹详情" :visible.sync="viewDialogVisible" width="800px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="统计期间">{{ viewForm.period }}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ viewForm.customerName }}</el-descriptions-item>
        <el-descriptions-item label="起始地">{{ viewForm.origin }}</el-descriptions-item>
        <el-descriptions-item label="目的地">{{ viewForm.destination }}</el-descriptions-item>
        <el-descriptions-item label="运输距离">{{ viewForm.distance }} km</el-descriptions-item>
        <el-descriptions-item label="运输方式">{{ getTransportTypeText(viewForm.transportType) }}</el-descriptions-item>
        <el-descriptions-item label="货物重量">{{ viewForm.weight }} kg</el-descriptions-item>
        <el-descriptions-item label="碳排放量">{{ viewForm.carbonEmission }} kg</el-descriptions-item>
        <el-descriptions-item label="排放强度">{{ viewForm.carbonIntensity }} kg/km</el-descriptions-item>
        <el-descriptions-item label="减排措施">{{ viewForm.reductionMeasures }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ viewForm.remark }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CarbonManagement',
  data() {
    return {
      searchForm: {
        period: '',
        customerName: '',
        transportType: ''
      },
      carbonList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      totalCarbonEmission: 12500,
      avgCarbonIntensity: 0.15,
      carbonChange: -5.2,
      intensityChange: -3.1,
      carbonReduction: 1875,
      newEnergyRatio: 28.5,
      dialogVisible: false,
      viewDialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        period: '',
        customerName: '',
        origin: '',
        destination: '',
        distance: '',
        transportType: '',
        weight: '',
        carbonEmission: '',
        carbonIntensity: '',
        reductionMeasures: '',
        remark: ''
      },
      viewForm: {
        period: '',
        customerName: '',
        origin: '',
        destination: '',
        distance: '',
        transportType: '',
        weight: '',
        carbonEmission: '',
        carbonIntensity: '',
        reductionMeasures: '',
        remark: ''
      },
      rules: {
        period: [{ required: true, message: '请选择统计期间', trigger: 'change' }],
        customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        origin: [{ required: true, message: '请输入起始地', trigger: 'blur' }],
        destination: [{ required: true, message: '请输入目的地', trigger: 'blur' }],
        distance: [{ required: true, message: '请输入运输距离', trigger: 'blur' }],
        transportType: [{ required: true, message: '请选择运输方式', trigger: 'change' }],
        weight: [{ required: true, message: '请输入货物重量', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCarbonList()
  },
  methods: {
    getCarbonList() {
      // 模拟API调用
      const mockData = {
        list: [
          {
            id: 1,
            period: '2026-01',
            customerName: '北京鸿驰祥瑞物流有限公司',
            origin: '北京',
            destination: '上海',
            distance: 1318,
            transportType: 'road',
            weight: 5000,
            carbonEmission: 197.7,
            carbonIntensity: 0.15,
            reductionMeasures: '使用新能源车辆',
            remark: '月度常规运输'
          },
          {
            id: 2,
            period: '2026-01',
            customerName: '上海发货企业有限公司',
            origin: '上海',
            destination: '广州',
            distance: 1430,
            transportType: 'railway',
            weight: 8000,
            carbonEmission: 100.1,
            carbonIntensity: 0.07,
            reductionMeasures: '采用铁路运输',
            remark: '批量货物运输'
          },
          {
            id: 3,
            period: '2026-01',
            customerName: '北京鸿驰祥瑞物流有限公司',
            origin: '北京',
            destination: '成都',
            distance: 1870,
            transportType: 'air',
            weight: 1000,
            carbonEmission: 748.0,
            carbonIntensity: 0.40,
            reductionMeasures: '优化航线',
            remark: '紧急货物运输'
          }
        ],
        total: 3
      }
      this.carbonList = mockData.list
      this.total = mockData.total
    },
    handleSearch() {
      this.currentPage = 1
      this.getCarbonList()
    },
    resetForm() {
      this.searchForm = {
        period: '',
        customerName: '',
        transportType: ''
      }
      this.getCarbonList()
    },
    handleAdd() {
      this.dialogTitle = '新增碳足迹记录'
      this.form = {
        id: '',
        period: new Date().toISOString().split('T')[0].substring(0, 7),
        customerName: '',
        origin: '',
        destination: '',
        distance: '',
        transportType: '',
        weight: '',
        carbonEmission: '',
        carbonIntensity: '',
        reductionMeasures: '',
        remark: ''
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑碳足迹记录'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleView(row) {
      this.viewForm = { ...row }
      this.viewDialogVisible = true
    },
    handleSubmit() {
      this.calculateCarbonEmission()
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 模拟API调用
          console.log('提交数据:', this.form)
          this.dialogVisible = false
          this.getCarbonList()
          this.$message.success('操作成功')
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定要删除该碳足迹记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟API调用
        console.log('删除碳足迹记录:', id)
        this.getCarbonList()
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getCarbonList()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.getCarbonList()
    },
    getTransportTypeText(type) {
      const typeMap = {
        road: '公路运输',
        railway: '铁路运输',
        air: '航空运输',
        water: '水路运输'
      }
      return typeMap[type] || type
    },
    calculateCarbonEmission() {
      // 模拟碳排放量计算
      const emissionFactors = {
        road: 0.15,      // kg/km/ton
        railway: 0.07,   // kg/km/ton
        air: 0.40,       // kg/km/ton
        water: 0.05      // kg/km/ton
      }
      const factor = emissionFactors[this.form.transportType] || 0.15
      const weightTon = this.form.weight / 1000
      this.form.carbonEmission = (this.form.distance * weightTon * factor).toFixed(1)
      this.form.carbonIntensity = (this.form.carbonEmission / this.form.distance).toFixed(2)
    }
  },
  watch: {
    'form.transportType': function() {
      if (this.form.distance && this.form.weight) {
        this.calculateCarbonEmission()
      }
    },
    'form.distance': function() {
      if (this.form.transportType && this.form.weight) {
        this.calculateCarbonEmission()
      }
    },
    'form.weight': function() {
      if (this.form.transportType && this.form.distance) {
        this.calculateCarbonEmission()
      }
    }
  }
}
</script>

<style scoped>
.green-carbon-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.search-form {
  margin-bottom: 0;
}

.stats-container {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  color: #67c23a;
}

.stat-change.positive {
  color: #f56c6c;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>