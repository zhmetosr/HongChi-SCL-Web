<template>
  <div class="placeholder">
    <el-card shadow="hover" class="h-full flex flex-col items-center justify-center p-8">
      <el-icon class="text-gray-300 text-5xl mb-4"><InfoFilled /></el-icon>
      <h2 class="text-xl font-bold mb-2">功能开发中</h2>
      <p class="text-gray-500 mb-6">该功能正在开发中，敬请期待</p>
      <el-button type="primary">
        <el-icon><ArrowLeft /></el-icon>
        返回首页
      </el-button>
    </el-card>
  </div>
</template>

<script setup>
import { InfoFilled, ArrowLeft } from '@element-plus/icons-vue'
</script>

<style scoped>
.placeholder {
  min-height: calc(100vh - 120px);
}
</style>