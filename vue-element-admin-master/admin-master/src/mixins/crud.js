import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      searchForm: {},
      dialogVisible: false,
      dialogTitle: '',
      form: {},
      rules: {},
      multipleSelection: []
    }
  },
  methods: {
    getList() {
      // 子类实现
    },
    handleAdd() {
      this.dialogTitle = '新增'
      this.form = {}
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {
        // 取消删除
      })
    },
    handleBatchDelete() {
      this.$confirm('确定要批量删除这些记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('批量删除成功')
        this.getList()
      }).catch(() => {
        // 取消删除
      })
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success(this.dialogTitle + '成功')
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    resetSearch() {
      this.searchForm = {}
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}