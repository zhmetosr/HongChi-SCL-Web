<template>
  <div class="customs-clearance-container">
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
  name: 'customsclearance',
  data() {
    return {
      moduleTitle: 'customs - clearance'
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