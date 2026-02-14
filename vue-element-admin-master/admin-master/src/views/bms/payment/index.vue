<template>
  <div class="bms-payment-container">
    <el-card>
      <template slot="header">
        <div class="card-header">
          <span>{{ moduleTitle }}</span>
        </div>
      </template>
      <el-empty description="功能开发中" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'bmspayment',
  data() {
    return {
      moduleTitle: 'bms - payment'
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>