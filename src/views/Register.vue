<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-light to-white flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/logo.png" :alt="t('header.companyName')" class="w-20 h-20 rounded-2xl object-cover mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-800">{{ t('register.title') }}</h2>
        <p class="text-gray-500 mt-2">{{ t('register.subtitle') }}</p>
      </div>

      <!-- 注册表单 -->
      <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <form @submit.prevent="handleRegister">
          <!-- 基本信息 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.company') }}</label>
              <input
                v-model="form.company"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('register.companyPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.name') }}</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('register.namePlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.phone') }}</label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('register.phonePlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.code') }}</label>
              <div class="flex space-x-3">
                <input
                  v-model="form.code"
                  type="text"
                  required
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  :placeholder="t('register.codePlaceholder')"
                />
                <button
                  type="button"
                  @click="sendCode"
                  :disabled="countdown > 0"
                  class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {{ countdown > 0 ? t('register.countdown', { countdown }) : t('register.getCode') }}
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.email') }}</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('register.emailPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.password') }}</label>
              <input
                v-model="form.password"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('register.passwordPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('register.confirmPassword') }}</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="t('register.confirmPasswordPlaceholder')"
              />
            </div>
          </div>

          <!-- 服务条款 -->
          <div class="mt-6">
            <label class="flex items-start">
              <input type="checkbox" v-model="form.agreeTerms" required class="mr-2 mt-1">
              <span class="text-gray-600 text-sm">
                {{ t('register.agreeTerms') }}
                <a href="#" class="text-primary hover:underline">{{ t('register.serviceTerms') }}</a>
                {{ t('register.and') }}
                <a href="#" class="text-primary hover:underline">{{ t('register.privacyPolicy') }}</a>
              </span>
            </label>
          </div>

          <!-- 注册按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {{ loading ? t('register.registering') : t('register.register') }}
          </button>
        </form>

        <!-- 登录链接 -->
        <div class="text-center mt-6">
          <span class="text-gray-600 text-sm">{{ t('register.haveAccount') }}</span>
          <router-link to="/login" class="text-primary text-sm hover:text-primary-hover transition-colors font-medium ml-1">
            {{ t('register.loginNow') }}
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

const { t } = useI18n()

const router = useRouter()
const loading = ref(false)
const countdown = ref(0)

const form = ref({
  company: '',
  name: '',
  phone: '',
  code: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const sendCode = () => {
  if (!form.value.phone) {
    alert('请输入手机号码')
    return
  }

  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(form.value.phone)) {
    alert('请输入正确的手机号码')
    return
  }

  // 模拟发送验证码
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)

  alert('验证码已发送，请注意查收')
}

const handleRegister = async () => {
  // 验证密码
  if (form.value.password !== form.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }

  if (form.value.password.length < 6) {
    alert('密码长度至少为6位')
    return
  }

  loading.value = true

  try {
    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1500))

    alert('注册成功！请登录')
    router.push('/login')
  } catch (error) {
    alert('注册失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>
