import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/Services.vue'),
    meta: { title: '服务与解决方案 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('@/views/Support.vue'),
    meta: { title: '服务支持 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/support/order',
    name: 'SupportOrder',
    component: () => import('@/views/SupportOrder.vue'),
    meta: { title: '下单发货 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/support/track',
    name: 'SupportTrack',
    component: () => import('@/views/LogisticsTracking.vue'),
    meta: { title: '物流查询 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/support/cooperation',
    name: 'SupportCooperation',
    component: () => import('@/views/SupportCooperation.vue'),
    meta: { title: '合作咨询 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/support/tech-cooperation',
    name: 'SupportTechCooperation',
    component: () => import('@/views/SupportTechCooperation.vue'),
    meta: { title: '科技智能合作 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/support/tech-transformation',
    name: 'SupportTechTransformation',
    component: () => import('@/views/SupportTechTransformation.vue'),
    meta: { title: '技术转型 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于我们 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: { title: '合作咨询 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/quote',
    name: 'Quote',
    component: () => import('@/views/Quote.vue'),
    meta: { title: '报价单 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/user',
    name: 'UserCenter',
    component: () => import('@/views/UserCenter.vue'),
    meta: { title: '用户中心 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue'),
    meta: { title: '新闻资讯 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetail.vue'),
    meta: { title: '新闻详情 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: () => import('@/views/Announcements.vue'),
    meta: { title: '服务公告 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/logistics-knowledge',
    name: 'LogisticsKnowledge',
    component: () => import('@/views/LogisticsKnowledge.vue'),
    meta: { title: '国际物流知识 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/trade-knowledge',
    name: 'TradeKnowledge',
    component: () => import('@/views/TradeKnowledge.vue'),
    meta: { title: '国际贸易知识 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/Terms.vue'),
    meta: { title: '使用条款 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue'),
    meta: { title: '隐私政策 - 北京鸿驰祥瑞物流' }
  },
  {
    path: '/logistics-tracking',
    name: 'LogisticsTracking',
    component: () => import('@/views/LogisticsTracking.vue'),
    meta: { title: '物流查询 - 北京鸿驰祥瑞物流' }
  },
  // 管理后台路由
  {
    path: '/admin',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { title: '管理后台首页' }
      },
      // 客户关系管理
      {
        path: 'crm/customer',
        name: 'AdminCustomer',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '客户管理' }
      },
      {
        path: 'crm/contact',
        name: 'AdminContact',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '联系人管理' }
      },
      {
        path: 'crm/visit',
        name: 'AdminVisit',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '拜访管理' }
      },
      // 订单管理
      {
        path: 'oms/order',
        name: 'AdminOrder',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '订单管理' }
      },
      {
        path: 'oms/waybill',
        name: 'AdminWaybill',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '运单管理' }
      },
      {
        path: 'oms/return',
        name: 'AdminReturn',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '回单管理' }
      },
      // 运输管理
      {
        path: 'tms/transport',
        name: 'AdminTransport',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '运输管理' }
      },
      {
        path: 'tms/tracking',
        name: 'AdminTracking',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '货物追踪' }
      },
      {
        path: 'tms/schedule',
        name: 'AdminSchedule',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '调度管理' }
      },
      // 财务结算
      {
        path: 'bms/settlement',
        name: 'AdminSettlement',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '结算管理' }
      },
      {
        path: 'bms/invoice',
        name: 'AdminInvoice',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '发票管理' }
      },
      {
        path: 'bms/payment',
        name: 'AdminPayment',
        component: () => import('@/views/admin/Placeholder.vue'),
        meta: { title: '付款管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '北京鸿驰祥瑞物流有限公司'
  
  // 检查是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authStore = useAuthStore()
    
    // 初始化认证状态
    if (!authStore.isLoggedIn) {
      authStore.initAuth()
    }
    
    // 检查是否已登录
    if (!authStore.isLoggedIn) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 检查角色权限
      if (to.meta.roles && !to.meta.roles.some(role => authStore.roles.includes(role))) {
        // 没有权限，重定向到首页
        next('/')
      } else {
        // 有权限，继续访问
        next()
      }
    }
  } else {
    // 不需要认证，直接访问
    next()
  }
})

export default router
