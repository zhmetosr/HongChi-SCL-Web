<template>
  <div class="admin-layout min-h-screen bg-gray-50 flex">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="bg-white border-r border-gray-200">
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-lg font-bold text-primary">鸿驰祥瑞管理后台</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="admin-sidebar"
        router
        :unique-opened="true"
        text-color="#303133"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/admin/dashboard">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>客户关系管理</span>
          </template>
          <el-menu-item index="/admin/crm/customer">客户管理</el-menu-item>
          <el-menu-item index="/admin/crm/contact">联系人管理</el-menu-item>
          <el-menu-item index="/admin/crm/visit">拜访管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><ShoppingCart /></el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/admin/oms/order">订单管理</el-menu-item>
          <el-menu-item index="/admin/oms/waybill">运单管理</el-menu-item>
          <el-menu-item index="/admin/oms/return">回单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>运输管理</span>
          </template>
          <el-menu-item index="/admin/tms/transport">运输管理</el-menu-item>
          <el-menu-item index="/admin/tms/tracking">货物追踪</el-menu-item>
          <el-menu-item index="/admin/tms/schedule">调度管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Coin /></el-icon>
            <span>财务结算</span>
          </template>
          <el-menu-item index="/admin/bms/settlement">结算管理</el-menu-item>
          <el-menu-item index="/admin/bms/invoice">发票管理</el-menu-item>
          <el-menu-item index="/admin/bms/payment">付款管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主内容区域 -->
    <div class="flex-1 flex flex-col">
      <!-- 顶部导航栏 -->
      <el-header height="60px" class="bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div class="flex items-center">
          <button class="mr-4 text-gray-500 hover:text-gray-700">
            <el-icon><Menu /></el-icon>
          </button>
          <h2 class="text-lg font-medium">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center">
          <el-dropdown>
            <span class="flex items-center cursor-pointer text-gray-700">
              <el-avatar :size="32" class="mr-2">{{ userInitial }}</el-avatar>
              <span>{{ userName }}</span>
              <el-icon class="ml-1"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><UserFilled /></el-icon>
                  <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="flex-1 p-4 overflow-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  House,
  User,
  ShoppingCart,
  Menu,
  Coin,
  UserFilled,
  SwitchButton,
  ArrowDown
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 计算当前激活的菜单
const activeMenu = computed(() => {
  return route.path
})

// 计算页面标题
const pageTitle = computed(() => {
  const pathMap = {
    '/admin/dashboard': '首页',
    '/admin/crm/customer': '客户管理',
    '/admin/crm/contact': '联系人管理',
    '/admin/crm/visit': '拜访管理',
    '/admin/oms/order': '订单管理',
    '/admin/oms/waybill': '运单管理',
    '/admin/oms/return': '回单管理',
    '/admin/tms/transport': '运输管理',
    '/admin/tms/tracking': '货物追踪',
    '/admin/tms/schedule': '调度管理',
    '/admin/bms/settlement': '结算管理',
    '/admin/bms/invoice': '发票管理',
    '/admin/bms/payment': '付款管理'
  }
  return pathMap[route.path] || '管理后台'
})

// 计算用户名和首字母
const userName = computed(() => authStore.userName)
const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0).toUpperCase() : 'A'
})

// 处理退出登录
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-sidebar {
  height: calc(100vh - 60px);
  border-right: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>