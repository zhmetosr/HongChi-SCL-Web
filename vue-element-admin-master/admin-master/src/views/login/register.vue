<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      label-width="0px"
      class="register-form"
    >
      <h3 class="title">用户注册</h3>
      <el-form-item prop="userType">
        <el-radio-group v-model="registerForm.userType" class="user-type-group">
          <el-radio-button label="logistics">物流企业</el-radio-button>
          <el-radio-button label="shipper">发货企业</el-radio-button>
          <el-radio-button label="driver">司机</el-radio-button>
          <el-radio-button label="line">物流专线</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          type="text"
          placeholder="用户名"
          auto-complete="off"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="registerForm.phone"
          type="text"
          placeholder="手机号"
          auto-complete="off"
        >
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="registerForm.email"
          type="email"
          placeholder="邮箱"
          auto-complete="off"
        >
          <svg-icon slot="prefix" icon-class="email" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="密码"
          auto-complete="off"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          placeholder="确认密码"
          auto-complete="off"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleRegister"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 其他注册方式 -->
    <div class="other-register">
      <span>其他注册方式：</span>
      <div class="social-signin">
        <el-button
          v-for="social in socialSignInItems"
          :key="social.id"
          class="social-signin-btn"
          :class="social.id"
          @click="socialSignIn(social.id)"
        >
          <svg-icon :icon-class="social.icon" />
        </el-button>
      </div>
    </div>
    <div class="login-link">
      <router-link to="/login">已有账号？立即登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度至少6位'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        userType: 'logistics',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
      },
      socialSignInItems: [
        { id: 'wechat', icon: 'wechat' },
        { id: 'qq', icon: 'qq' }
      ]
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          // 注册逻辑
          this.$message.success('注册成功，请登录')
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    socialSignIn(type) {
      this.$message.success(`使用${type}注册`)
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100%;
  width: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
}

.register-form {
  width: 400px;
  max-width: 100%;
  padding: 35px 35px 15px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0 auto 20px;
  text-align: center;
  color: #303133;
}

.user-type-group {
  margin-bottom: 20px;
}

.other-register {
  text-align: center;
  margin-top: 20px;
}

.social-signin {
  margin-top: 10px;
}

.social-signin-btn {
  margin: 0 5px;
}

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link a {
  color: #409eff;
  text-decoration: none;
}

.input-icon {
  color: #c0c4cc;
}
</style>