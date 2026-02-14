import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意：子菜单仅在 route children.length >= 1 时才会显示
 * 详情请参考：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为 true，项目将不会显示在侧边栏中(默认是 false)
 * alwaysShow: true               如果设置为 true，将始终显示根菜单
 *                                如果不设置 alwaysShow，当项目有多个子路由时，
 *                                它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为 noRedirect 将不会在面包屑中重定向
 * name:'router-name'             名称由 <keep-alive> 使用(必须设置!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               在侧边栏和面包屑中显示的名称(推荐设置)
    icon: 'svg-name'/'el-icon-x' 在侧边栏中显示的图标
    noCache: true                如果设置为 true，页面将不会被缓存(默认是 false)
    affix: true                  如果设置为 true，标签将固定在标签视图中
    breadcrumb: false            如果设置为 false，项目将在面包屑中隐藏(默认是 true)
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * 常量路由
 * 不需要权限要求的基础页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 客户关系管理系统
  {
    path: '/crm',
    component: Layout,
    redirect: '/crm/customer',
    alwaysShow: true,
    name: 'CRM',
    meta: {
      title: '客户关系管理',
      icon: 'peoples',
      roles: ['admin', 'sales', 'operation', 'customerService', 'finance']
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/crm/customer/index'),
        name: 'Customer',
        meta: {
          title: '客户管理',
          roles: ['admin', 'sales', 'operation', 'customerService']
        }
      },
      {
        path: 'contact',
        component: () => import('@/views/crm/contact/index'),
        name: 'Contact',
        meta: {
          title: '联系人管理',
          roles: ['admin', 'sales', 'operation', 'customerService']
        }
      },
      {
        path: 'visit',
        component: () => import('@/views/crm/visit/index'),
        name: 'Visit',
        meta: {
          title: '拜访管理',
          roles: ['admin', 'sales']
        }
      }
    ]
  },

  // 销售管理系统
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/product',
    alwaysShow: true,
    name: 'SMS',
    meta: {
      title: '销售管理',
      icon: 'shopping',
      roles: ['admin', 'sales', 'operation']
    },
    children: [
      {
        path: 'product',
        component: () => import('@/views/sms/product/index'),
        name: 'Product',
        meta: {
          title: '产品管理',
          roles: ['admin', 'sales']
        }
      },
      {
        path: 'contract',
        component: () => import('@/views/sms/contract/index'),
        name: 'Contract',
        meta: {
          title: '合同管理',
          roles: ['admin', 'sales', 'operation']
        }
      },
      {
        path: 'quote',
        component: () => import('@/views/sms/quote/index'),
        name: 'Quote',
        meta: {
          title: '报价管理',
          roles: ['admin', 'sales']
        }
      }
    ]
  },

  // 供应商管理系统
  {
    path: '/srm',
    component: Layout,
    redirect: '/srm/supplier',
    alwaysShow: true,
    name: 'SRM',
    meta: {
      title: '供应商管理',
      icon: 'component',
      roles: ['admin', 'operation', 'finance']
    },
    children: [
      {
        path: 'supplier',
        component: () => import('@/views/srm/supplier/index'),
        name: 'Supplier',
        meta: {
          title: '供应商管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'driver',
        component: () => import('@/views/srm/driver/index'),
        name: 'Driver',
        meta: {
          title: '司机管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'line',
        component: () => import('@/views/srm/line/index'),
        name: 'Line',
        meta: {
          title: '专线管理',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 价格管理系统
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/price',
    alwaysShow: true,
    name: 'PMS',
    meta: {
      title: '价格管理',
      icon: 'money',
      roles: ['admin', 'sales', 'operation']
    },
    children: [
      {
        path: 'price',
        component: () => import('@/views/pms/price/index'),
        name: 'Price',
        meta: {
          title: '价格管理',
          roles: ['admin', 'sales', 'operation']
        }
      },
      {
        path: 'discount',
        component: () => import('@/views/pms/discount/index'),
        name: 'Discount',
        meta: {
          title: '折扣管理',
          roles: ['admin', 'sales']
        }
      }
    ]
  },

  // 订单管理系统
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    alwaysShow: true,
    name: 'OMS',
    meta: {
      title: '订单管理',
      icon: 'list',
      roles: ['admin', 'sales', 'operation', 'customerService']
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/oms/order/index'),
        name: 'Order',
        meta: {
          title: '订单管理',
          roles: ['admin', 'sales', 'operation', 'customerService']
        }
      },
      {
        path: 'waybill',
        component: () => import('@/views/oms/waybill/index'),
        name: 'Waybill',
        meta: {
          title: '运单管理',
          roles: ['admin', 'operation', 'customerService']
        }
      },
      {
        path: 'return',
        component: () => import('@/views/oms/return/index'),
        name: 'Return',
        meta: {
          title: '回单管理',
          roles: ['admin', 'operation', 'customerService']
        }
      }
    ]
  },

  // 运输管理系统
  {
    path: '/tms',
    component: Layout,
    redirect: '/tms/transport',
    alwaysShow: true,
    name: 'TMS',
    meta: {
      title: '运输管理',
      icon: 'truck',
      roles: ['admin', 'operation', 'customerService']
    },
    children: [
      {
        path: 'transport',
        component: () => import('@/views/tms/transport/index'),
        name: 'Transport',
        meta: {
          title: '运输管理',
          roles: ['admin', 'operation', 'customerService']
        }
      },
      {
        path: 'tracking',
        component: () => import('@/views/tms/tracking/index'),
        name: 'Tracking',
        meta: {
          title: '货物追踪',
          roles: ['admin', 'operation', 'customerService']
        }
      },
      {
        path: 'schedule',
        component: () => import('@/views/tms/schedule/index'),
        name: 'Schedule',
        meta: {
          title: '调度管理',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 仓储管理系统
  {
    path: '/wms',
    component: Layout,
    redirect: '/wms/warehouse',
    alwaysShow: true,
    name: 'WMS',
    meta: {
      title: '仓储管理',
      icon: 'storage',
      roles: ['admin', 'operation']
    },
    children: [
      {
        path: 'warehouse',
        component: () => import('@/views/wms/warehouse/index'),
        name: 'Warehouse',
        meta: {
          title: '仓库管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'inventory',
        component: () => import('@/views/wms/inventory/index'),
        name: 'Inventory',
        meta: {
          title: '库存管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'inout',
        component: () => import('@/views/wms/inout/index'),
        name: 'InOut',
        meta: {
          title: '出入库管理',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 运营管理系统
  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/task',
    alwaysShow: true,
    name: 'Operation',
    meta: {
      title: '运营管理',
      icon: 'chart',
      roles: ['admin', 'operation']
    },
    children: [
      {
        path: 'task',
        component: () => import('@/views/operation/task/index'),
        name: 'Task',
        meta: {
          title: '任务管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'performance',
        component: () => import('@/views/operation/performance/index'),
        name: 'Performance',
        meta: {
          title: '绩效分析',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 客服管理系统
  {
    path: '/csms',
    component: Layout,
    redirect: '/csms/complaint',
    alwaysShow: true,
    name: 'CSMS',
    meta: {
      title: '客服管理',
      icon: 'message',
      roles: ['admin', 'customerService']
    },
    children: [
      {
        path: 'complaint',
        component: () => import('@/views/csms/complaint/index'),
        name: 'Complaint',
        meta: {
          title: '投诉管理',
          roles: ['admin', 'customerService']
        }
      },
      {
        path: 'feedback',
        component: () => import('@/views/csms/feedback/index'),
        name: 'Feedback',
        meta: {
          title: '反馈管理',
          roles: ['admin', 'customerService']
        }
      },
      {
        path: 'faq',
        component: () => import('@/views/csms/faq/index'),
        name: 'FAQ',
        meta: {
          title: '常见问题',
          roles: ['admin', 'customerService']
        }
      }
    ]
  },

  // 关务管理系统
  {
    path: '/customs',
    component: Layout,
    redirect: '/customs/declaration',
    alwaysShow: true,
    name: 'Customs',
    meta: {
      title: '关务管理',
      icon: 'international',
      roles: ['admin', 'operation', 'sales']
    },
    children: [
      {
        path: 'declaration',
        component: () => import('@/views/customs/declaration/index'),
        name: 'Declaration',
        meta: {
          title: '报关管理',
          roles: ['admin', 'operation', 'sales']
        }
      },
      {
        path: 'clearance',
        component: () => import('@/views/customs/clearance/index'),
        name: 'Clearance',
        meta: {
          title: '清关管理',
          roles: ['admin', 'operation', 'sales']
        }
      }
    ]
  },

  // 财务结算系统
  {
    path: '/bms',
    component: Layout,
    redirect: '/bms/settlement',
    alwaysShow: true,
    name: 'BMS',
    meta: {
      title: '财务结算',
      icon: 'money',
      roles: ['admin', 'finance']
    },
    children: [
      {
        path: 'settlement',
        component: () => import('@/views/bms/settlement/index'),
        name: 'Settlement',
        meta: {
          title: '结算管理',
          roles: ['admin', 'finance']
        }
      },
      {
        path: 'invoice',
        component: () => import('@/views/bms/invoice/index'),
        name: 'Invoice',
        meta: {
          title: '发票管理',
          roles: ['admin', 'finance']
        }
      },
      {
        path: 'payment',
        component: () => import('@/views/bms/payment/index'),
        name: 'Payment',
        meta: {
          title: '付款管理',
          roles: ['admin', 'finance']
        }
      }
    ]
  },

  // 智慧决策系统
  {
    path: '/iws',
    component: Layout,
    redirect: '/iws/analysis',
    alwaysShow: true,
    name: 'IWS',
    meta: {
      title: '智慧决策',
      icon: 'brain',
      roles: ['admin']
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/iws/analysis/index'),
        name: 'Analysis',
        meta: {
          title: '数据分析',
          roles: ['admin']
        }
      },
      {
        path: 'report',
        component: () => import('@/views/iws/report/index'),
        name: 'Report',
        meta: {
          title: '报表管理',
          roles: ['admin']
        }
      },
      {
        path: 'prediction',
        component: () => import('@/views/iws/prediction/index'),
        name: 'Prediction',
        meta: {
          title: '预测分析',
          roles: ['admin']
        }
      }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    alwaysShow: true,
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'setting',
      roles: ['admin']
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        name: 'User',
        meta: {
          title: '用户管理',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'Role',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        name: 'Menu',
        meta: {
          title: '菜单管理',
          roles: ['admin']
        }
      },
      {
        path: 'config',
        component: () => import('@/views/system/config/index'),
        name: 'Config',
        meta: {
          title: '系统配置',
          roles: ['admin']
        }
      }
    ]
  },

  // 主数据管理系统
  {
    path: '/mdm',
    component: Layout,
    redirect: '/mdm/customer',
    alwaysShow: true,
    name: 'MDM',
    meta: {
      title: '主数据管理',
      icon: 'database',
      roles: ['admin', 'operation']
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/mdm/customer/index'),
        name: 'MDMCustomer',
        meta: {
          title: '客户主数据',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'supplier',
        component: () => import('@/views/mdm/supplier/index'),
        name: 'MDMSupplier',
        meta: {
          title: '供应商主数据',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'product',
        component: () => import('@/views/mdm/product/index'),
        name: 'MDMProduct',
        meta: {
          title: '产品主数据',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'price',
        component: () => import('@/views/mdm/price/index'),
        name: 'MDMPrice',
        meta: {
          title: '价格主数据',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 税务管理系统
  {
    path: '/tax',
    component: Layout,
    redirect: '/tax/domestic',
    alwaysShow: true,
    name: 'Tax',
    meta: {
      title: '税务管理',
      icon: 'money',
      roles: ['admin', 'finance']
    },
    children: [
      {
        path: 'domestic',
        component: () => import('@/views/tax/domestic/index'),
        name: 'DomesticTax',
        meta: {
          title: '国内税务',
          roles: ['admin', 'finance']
        }
      },
      {
        path: 'international',
        component: () => import('@/views/tax/international/index'),
        name: 'InternationalTax',
        meta: {
          title: '国际税务',
          roles: ['admin', 'finance']
        }
      },
      {
        path: 'invoice',
        component: () => import('@/views/tax/invoice/index'),
        name: 'TaxInvoice',
        meta: {
          title: '税务发票',
          roles: ['admin', 'finance']
        }
      }
    ]
  },

  // 法务管理系统
  {
    path: '/legal',
    component: Layout,
    redirect: '/legal/contract',
    alwaysShow: true,
    name: 'Legal',
    meta: {
      title: '法务管理',
      icon: 'document',
      roles: ['admin', 'sales', 'customerService']
    },
    children: [
      {
        path: 'contract',
        component: () => import('@/views/legal/contract/index'),
        name: 'LegalContract',
        meta: {
          title: '合同管理',
          roles: ['admin', 'sales']
        }
      },
      {
        path: 'dispute',
        component: () => import('@/views/legal/dispute/index'),
        name: 'LegalDispute',
        meta: {
          title: '纠纷管理',
          roles: ['admin', 'customerService']
        }
      },
      {
        path: 'compliance',
        component: () => import('@/views/legal/compliance/index'),
        name: 'LegalCompliance',
        meta: {
          title: '合规管理',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 信用管理系统
  {
    path: '/credit',
    component: Layout,
    redirect: '/credit/customer',
    alwaysShow: true,
    name: 'Credit',
    meta: {
      title: '信用管理',
      icon: 'star',
      roles: ['admin', 'sales', 'operation', 'finance']
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/credit/customer/index'),
        name: 'CreditCustomer',
        meta: {
          title: '客户信用',
          roles: ['admin', 'sales', 'finance']
        }
      },
      {
        path: 'supplier',
        component: () => import('@/views/credit/supplier/index'),
        name: 'CreditSupplier',
        meta: {
          title: '供应商信用',
          roles: ['admin', 'operation', 'finance']
        }
      },
      {
        path: 'driver',
        component: () => import('@/views/credit/driver/index'),
        name: 'CreditDriver',
        meta: {
          title: '司机信用',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // AI智能中台系统
  {
    path: '/ai',
    component: Layout,
    redirect: '/ai/capabilities',
    alwaysShow: true,
    name: 'AI',
    meta: {
      title: 'AI智能中台',
      icon: 'brain',
      roles: ['admin', 'operation']
    },
    children: [
      {
        path: 'capabilities',
        component: () => import('@/views/ai/capabilities/index'),
        name: 'AICapabilities',
        meta: {
          title: '智能能力',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'models',
        component: () => import('@/views/ai/models/index'),
        name: 'AIModels',
        meta: {
          title: '模型管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'logs',
        component: () => import('@/views/ai/logs/index'),
        name: 'AILogs',
        meta: {
          title: '调用日志',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 绿色供应链（碳管理）系统
  {
    path: '/green',
    component: Layout,
    redirect: '/green/carbon',
    alwaysShow: true,
    name: 'Green',
    meta: {
      title: '绿色供应链',
      icon: 'tree',
      roles: ['admin', 'operation']
    },
    children: [
      {
        path: 'carbon',
        component: () => import('@/views/green/carbon/index'),
        name: 'CarbonManagement',
        meta: {
          title: '碳足迹管理',
          roles: ['admin', 'operation']
        }
      },
      {
        path: 'esg',
        component: () => import('@/views/green/esg/index'),
        name: 'ESGReport',
        meta: {
          title: 'ESG报告',
          roles: ['admin', 'operation', 'finance']
        }
      },
      {
        path: 'optimization',
        component: () => import('@/views/green/optimization/index'),
        name: 'GreenOptimization',
        meta: {
          title: '绿色优化',
          roles: ['admin', 'operation']
        }
      }
    ]
  },

  // 数字化风控系统
  {
    path: '/risk',
    component: Layout,
    redirect: '/risk/monitor',
    alwaysShow: true,
    name: 'Risk',
    meta: {
      title: '数字化风控',
      icon: 'warning',
      roles: ['admin', 'operation', 'finance']
    },
    children: [
      {
        path: 'monitor',
        component: () => import('@/views/risk/monitor/index'),
        name: 'RiskMonitor',
        meta: {
          title: '风险监控',
          roles: ['admin', 'operation', 'finance']
        }
      },
      {
        path: 'alert',
        component: () => import('@/views/risk/alert/index'),
        name: 'RiskAlert',
        meta: {
          title: '风险预警',
          roles: ['admin', 'operation', 'finance']
        }
      },
      {
        path: 'disposal',
        component: () => import('@/views/risk/disposal/index'),
        name: 'RiskDisposal',
        meta: {
          title: '风险处置',
          roles: ['admin', 'operation', 'finance']
        }
      }
    ]
  },

  // 生态协同管理系统
  {
    path: '/eco',
    component: Layout,
    redirect: '/eco/partners',
    alwaysShow: true,
    name: 'Eco',
    meta: {
      title: '生态协同管理',
      icon: 'link',
      roles: ['admin', 'operation', 'sales']
    },
    children: [
      {
        path: 'partners',
        component: () => import('@/views/eco/partners/index'),
        name: 'EcoPartners',
        meta: {
          title: '生态伙伴',
          roles: ['admin', 'operation', 'sales']
        }
      },
      {
        path: 'services',
        component: () => import('@/views/eco/services/index'),
        name: 'EcoServices',
        meta: {
          title: '增值服务',
          roles: ['admin', 'operation', 'sales']
        }
      },
      {
        path: 'finance',
        component: () => import('@/views/eco/finance/index'),
        name: 'EcoFinance',
        meta: {
          title: '供应链金融',
          roles: ['admin', 'operation', 'finance']
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
