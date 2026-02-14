import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 获取 token
import getPageTitle from '@/utils/get-page-title' // 获取页面标题

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login', '/auth-redirect'] // 不需要重定向的白名单

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到首页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 确定用户是否通过 getInfo 获取了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 检查是否有从官网同步过来的用户信息
          const adminUser = localStorage.getItem('Admin-User')
          if (adminUser) {
            // 使用同步过来的用户信息
            const userInfo = JSON.parse(adminUser)
            // 模拟设置用户角色
            const roles = ['admin']
            
            // 设置用户信息到 store
            store.commit('user/SET_NAME', userInfo.name)
            store.commit('user/SET_AVATAR', '/logo.jpg')
            store.commit('user/SET_ROLES', roles)
            store.commit('user/SET_INTRODUCTION', '系统管理员')
            
            // 根据角色生成可访问的路由映射
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // 动态添加可访问的路由
            router.addRoutes(accessRoutes)

            // 确保 addRoutes 完成的 hack 方法
            // 设置 replace: true，这样导航就不会留下历史记录
            next({ ...to, replace: true })
          } else {
            // 获取用户信息
            // 注意：roles 必须是一个对象数组！例如：['admin'] 或 ,['developer','editor']
            const { roles } = await store.dispatch('user/getInfo')

            // 根据角色生成可访问的路由映射
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // 动态添加可访问的路由
            router.addRoutes(accessRoutes)

            // 确保 addRoutes 完成的 hack 方法
            // 设置 replace: true，这样导航就不会留下历史记录
            next({ ...to, replace: true })
          }
        } catch (error) {
          // 移除 token 并跳转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '发生错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token */

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
