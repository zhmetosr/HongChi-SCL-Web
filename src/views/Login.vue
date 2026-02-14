<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-light to-white flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/logo.png" :alt="t('header.companyName')" class="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
        <h2 class="text-2xl font-bold text-gray-800">{{ t('login.title') }}</h2>
        <p class="text-gray-500 mt-2">{{ t('login.subtitle') }}</p>
      </div>

      <!-- 登录表单 -->
      <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <form @submit.prevent="handleLogin">
          <!-- 邮箱登录 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('login.email') }}</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('login.emailPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('login.password') }}</label>
              <input
                v-model="form.password"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('login.passwordPlaceholder')"
              />
            </div>
          </div>



          <!-- 记住我 & 忘记密码 -->
          <div class="flex justify-between items-center mb-6">
            <label class="flex items-center">
              <input type="checkbox" v-model="form.remember" class="mr-2 text-primary">
              <span class="text-gray-600 text-sm">{{ t('login.remember') }}</span>
            </label>
            <a href="#" class="text-primary text-sm hover:text-primary-hover transition-colors">{{ t('login.forgotPassword') }}</a>
          </div>

          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? t('login.loggingIn') : t('login.login') }}
          </button>

          <!-- 分隔线 -->
          <div class="flex items-center my-6">
            <div class="flex-1 border-t border-gray-200"></div>
            <span class="px-4 text-gray-400 text-sm">{{ t('login.otherLoginMethods') }}</span>
            <div class="flex-1 border-t border-gray-200"></div>
          </div>

          <!-- 第三方登录 -->
          <div class="flex justify-center space-x-6">
            <button
              type="button"
              class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
              :title="t('login.wechatLogin')"
            >
              <img src="/微信.png" :alt="t('login.wechatLogin')" class="w-6 h-6 object-contain" />
            </button>
            <button
              type="button"
              class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
              :title="t('login.qqLogin')"
            >
              <img src="/qq-1-1.svg" :alt="t('login.qqLogin')" class="w-6 h-6 object-contain" />
            </button>
          </div>
        </form>

        <!-- 注册链接 -->
        <div class="text-center mt-6">
          <span class="text-gray-600 text-sm">{{ t('login.noAccount') }}</span>
          <router-link to="/register" class="text-primary text-sm hover:text-primary-hover transition-colors font-medium ml-1">
            {{ t('login.registerNow') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  loading.value = true

  try {
    // 验证测试账号和管理员账号
    const validAccounts = [
      { email: 'hongchi@example.com', password: 'hongchi2026', name: '鸿驰', roles: ['user'] },
      { email: 'jishun@example.com', password: 'jishun2026', name: '吉顺', roles: ['user'] },
      { email: 'admin', password: '123456', name: '管理员', roles: ['admin'] },
      { email: 'admin@hongchixiangrui.com', password: 'hongchi2026$', name: '系统管理员', roles: ['admin'] }
    ]

    const matchedAccount = validAccounts.find(account => 
      account.email === form.value.email && account.password === form.value.password
    )

    if (!matchedAccount) {
      alert('账号或密码错误，请使用测试账号登录')
      return
    }

    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    const userData = {
      name: matchedAccount.name,
      email: matchedAccount.email
    }

    const token = 'mock_token_' + Date.now()

    authStore.login(userData, token, matchedAccount.roles)

    // 实现登录状态同步到管理后台
    if (matchedAccount.roles.includes('admin')) {
      // 为管理后台设置登录状态
      localStorage.setItem('Admin-Token', token)
      localStorage.setItem('Admin-User', JSON.stringify(userData))
      
      // 跳转到管理后台
      window.location.href = '/vue-element-admin-master/admin-master'
    } else {
      // 普通用户跳转到官网首页
      router.push('/')
    }
  } catch (error) {
    alert('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>
