<template>
  <div class="error-404-container">
    <div class="error-content">
      <!-- Logo -->
      <div class="error-logo">
        <img :src="require('@/assets/logo.jpg')" alt="鸿驰祥瑞物流">
      </div>
      
      <!-- Error Message -->
      <div class="error-message">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">页面不存在</h2>
        <p class="error-description">抱歉，您访问的页面不存在或已被移除</p>
      </div>
      
      <!-- Action Buttons -->
      <div class="error-actions">
        <el-button type="primary" size="large" @click="goHome">返回首页</el-button>
        <el-button size="large" @click="goBack">返回上一页</el-button>
      </div>
      
      <!-- Contact Info -->
      <div class="error-contact">
        <p>如有疑问，请联系管理员</p>
        <p class="contact-email">admin@hongchi.com</p>
        <p class="technical-support">技术支持：天津市极瞬网络科技有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.error-404-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 600px;
  width: 100%;
  animation: fadeIn 0.8s ease-out;
}

.error-logo {
  margin-bottom: 40px;
  animation: slideDown 0.6s ease-out;

  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: contain;
  }
}

.error-message {
  margin-bottom: 40px;
  animation: slideUp 0.6s ease-out 0.2s both;

  .error-code {
    font-size: 80px;
    font-weight: 700;
    color: #409eff;
    margin: 0 0 20px 0;
    line-height: 1;
  }

  .error-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 16px 0;
  }

  .error-description {
    font-size: 16px;
    color: #606266;
    margin: 0 0 24px 0;
  }

  .error-hint {
    font-size: 14px;
    color: #909399;
    margin: 0 0 12px 0;
  }

  .error-reasons {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #909399;

    li {
      margin: 8px 0;
      position: relative;
      padding-left: 20px;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #409eff;
        font-weight: bold;
      }
    }
  }
}

.error-actions {
  margin-bottom: 40px;
  animation: slideUp 0.6s ease-out 0.4s both;

  button {
    margin: 0 10px;
  }
}

.error-contact {
  animation: slideUp 0.6s ease-out 0.6s both;

  p {
    font-size: 14px;
    color: #909399;
    margin: 4px 0;
  }

  .contact-email {
    color: #409eff;
    font-weight: 500;
  }

  .technical-support {
    margin-top: 12px;
    font-size: 14px;
    color: #606266;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-content {
    padding: 40px 20px;
  }

  .error-code {
    font-size: 60px !important;
  }

  .error-title {
    font-size: 20px !important;
  }

  .error-description {
    font-size: 14px !important;
  }

  .error-actions {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      margin: 10px 0 !important;
      width: 200px;
    }
  }
}
</style>
