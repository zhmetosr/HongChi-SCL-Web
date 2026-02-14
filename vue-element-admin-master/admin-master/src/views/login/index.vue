<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <div class="logo-container">
          <img :src="require('@/assets/logo.jpg')" class="login-logo" alt="Logo">
        </div>
        <h3 class="title">鸿驰祥瑞管理后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>



      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>


    </el-form>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 固定账号密码验证
          if (this.loginForm.username === 'admin' && this.loginForm.password === '123456') {
            this.loading = true
            setTimeout(() => {
              this.$message.success('登录成功')
              // 模拟设置token和用户信息
              const token = 'admin-token'
              // 使用正确的方法保存token
              this.$store.commit('user/SET_TOKEN', token)
              setToken(token)
              // 模拟设置用户角色
              this.$store.commit('user/SET_ROLES', ['admin'])
              this.$store.commit('user/SET_NAME', '管理员')
              this.$store.commit('user/SET_AVATAR', '/logo.jpg')
              this.$store.commit('user/SET_INTRODUCTION', '系统管理员')
              // 生成路由
              this.$store.dispatch('permission/generateRoutes', ['admin']).then(accessRoutes => {
                this.$router.addRoutes(accessRoutes)
              })
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }, 1000)
          } else {
            this.$message.error('账号或密码错误，请输入正确的账号和密码')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#f0f9ff;
$light_gray:#1890ff;
$cursor: #1890ff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(24, 144, 255, 0.2);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    color: #1890ff;
  }

  .register-btn {
    color: #409eff;
    font-size: 14px;
  }

  .other-login {
    text-align: center;
    margin-top: 20px;
    color: $light_gray;

    .social-signin {
      margin-top: 15px;
      display: flex;
      justify-content: center;
    }

    .social-btn {
      margin: 0 10px;
      color: $light_gray;
      border-color: rgba(24, 144, 255, 0.2);

      span {
        margin-left: 5px;
      }

      &:hover {
        color: #409eff;
        border-color: #409eff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#f0f9ff;
$dark_gray:#40a9ff;
$light_gray:#1890ff;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 35px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: $light_gray;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    .logo-container {
      margin-bottom: 15px;
    }

    .login-logo {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: contain;
    }

    .title {
      font-size: 20px;
      color: $light_gray;
      margin: 0;
      text-align: center;
      font-weight: bold;
      flex: 1;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  @media only screen and (max-width: 470px) {
    .login-form {
      width: 100%;
      padding: 60px 20px 0;
    }

    .title {
      font-size: 18px;
    }
  }
}
</style>
