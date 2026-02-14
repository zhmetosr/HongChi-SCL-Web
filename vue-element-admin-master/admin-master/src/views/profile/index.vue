<template>
  <div class="profile-container">
    <!-- User Header -->
    <div class="user-header">
      <div class="user-info">
        <div class="user-avatar">
          <img :src="user.avatar" alt="User Avatar">
        </div>
        <div class="user-details">
          <h1>{{ user.name }}</h1>
          <p class="user-role">{{ user.role }}</p>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- User Content -->
    <el-row :gutter="24" class="user-content">
      <!-- Left Column - Personal Info -->
      <el-col :xs="24" :lg="8">
        <el-card shadow="hover" class="info-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <div class="info-item">
            <span class="info-label">姓名</span>
            <span class="info-value">{{ user.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">角色</span>
            <span class="info-value">{{ user.role }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">邮箱</span>
            <span class="info-value">{{ user.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">联系电话</span>
            <span class="info-value">{{ user.phone || '未设置' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">所属部门</span>
            <span class="info-value">{{ user.department || '未设置' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">入职日期</span>
            <span class="info-value">{{ user.joinDate || '未设置' }}</span>
          </div>
          <el-button type="primary" size="small" class="edit-btn">编辑信息</el-button>
        </el-card>

        <el-card shadow="hover" class="stats-card">
          <template #header>
            <div class="card-header">
              <span>工作统计</span>
            </div>
          </template>
          <div class="stat-item">
            <span class="stat-label">已完成订单</span>
            <span class="stat-value">128</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">处理配送</span>
            <span class="stat-value">356</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">客户满意度</span>
            <span class="stat-value">98%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">工作时长</span>
            <span class="stat-value">120h</span>
          </div>
        </el-card>
      </el-col>

      <!-- Right Column - Recent Activities -->
      <el-col :xs="24" :lg="16">
        <el-card shadow="hover" class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
            </div>
          </template>
          <div class="activity-list">
            <div v-for="(activity, index) in activities" :key="index" class="activity-item">
              <div class="activity-time">{{ activity.time }}</div>
              <div class="activity-content">
                <span class="activity-action">{{ activity.action }}</span>
                <span class="activity-desc">{{ activity.description }}</span>
              </div>
              <div class="activity-status" :class="activity.status">{{ activity.statusText }}</div>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover" class="tasks-card">
          <template #header>
            <div class="card-header">
              <span>待办任务</span>
              <el-button type="primary" size="small" plain>添加任务</el-button>
            </div>
          </template>
          <div class="task-list">
            <div v-for="(task, index) in tasks" :key="index" class="task-item">
              <el-checkbox v-model="task.completed">{{ task.name }}</el-checkbox>
              <div class="task-meta">
                <span class="task-deadline">{{ task.deadline }}</span>
                <span class="task-priority" :class="task.priority">{{ task.priorityText }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: '',
        role: '',
        email: '',
        avatar: '',
        phone: '138****8888',
        department: '运营部',
        joinDate: '2026-01-01'
      },
      activities: [
        {
          time: '2026-02-12 14:30',
          action: '完成配送',
          description: '完成北京京东世纪贸易有限公司的配送任务',
          status: 'success',
          statusText: '已完成'
        },
        {
          time: '2026-02-12 11:15',
          action: '处理订单',
          description: '处理北京苏宁云商销售有限公司的新订单',
          status: 'success',
          statusText: '已完成'
        },
        {
          time: '2026-02-12 09:45',
          action: '系统登录',
          description: '登录鸿驰祥瑞管理后台',
          status: 'info',
          statusText: '已记录'
        },
        {
          time: '2026-02-11 16:20',
          action: '更新信息',
          description: '更新个人联系方式',
          status: 'success',
          statusText: '已完成'
        }
      ],
      tasks: [
        {
          name: '审核新的配送路线',
          completed: false,
          deadline: '2026-02-13',
          priority: 'high',
          priorityText: '高'
        },
        {
          name: '更新客户信息数据库',
          completed: false,
          deadline: '2026-02-15',
          priority: 'medium',
          priorityText: '中'
        },
        {
          name: '准备周度工作汇报',
          completed: true,
          deadline: '2026-02-14',
          priority: 'low',
          priorityText: '低'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        ...this.user,
        name: this.name || '管理员',
        role: this.roles.join(' | ') || '系统管理员',
        email: 'admin@hongchi.com',
        avatar: this.avatar
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 24px;
  background-color: #f5f7fa;
}

.user-header {
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .user-info {
    display: flex;
    align-items: center;

    .user-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 30px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .user-details {
      flex: 1;

      h1 {
        font-size: 24px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 8px 0;
      }

      .user-role {
        font-size: 16px;
        color: #409eff;
        margin: 0 0 4px 0;
      }

      .user-email {
        font-size: 14px;
        color: #909399;
        margin: 0;
      }
    }
  }
}

.user-content {
  margin-bottom: 30px;
}

.info-card,
.stats-card,
.activity-card,
.tasks-card {
  margin-bottom: 24px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 600;
    color: #303133;
  }
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .info-label {
    color: #606266;
    font-size: 14px;
  }

  .info-value {
    color: #303133;
    font-weight: 500;
    font-size: 14px;
  }
}

.edit-btn {
  margin-top: 20px;
  width: 100%;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .stat-label {
    color: #606266;
    font-size: 14px;
  }

  .stat-value {
    color: #409eff;
    font-weight: 600;
    font-size: 16px;
  }
}

.activity-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .activity-time {
    font-size: 12px;
    color: #909399;
    margin-bottom: 8px;
  }

  .activity-content {
    margin-bottom: 8px;

    .activity-action {
      font-weight: 500;
      color: #303133;
      margin-right: 8px;
    }

    .activity-desc {
      color: #606266;
      font-size: 14px;
    }
  }

  .activity-status {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;

    &.success {
      background-color: #f0f9eb;
      color: #67c23a;
    }

    &.info {
      background-color: #ecf5ff;
      color: #409eff;
    }

    &.warning {
      background-color: #fdf6ec;
      color: #e6a23c;
    }

    &.danger {
      background-color: #fef0f0;
      color: #f56c6c;
    }
  }
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .task-meta {
    display: flex;
    align-items: center;

    .task-deadline {
      font-size: 12px;
      color: #909399;
      margin-right: 12px;
    }

    .task-priority {
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 12px;

      &.high {
        background-color: #fef0f0;
        color: #f56c6c;
      }

      &.medium {
        background-color: #fdf6ec;
        color: #e6a23c;
      }

      &.low {
        background-color: #f0f9eb;
        color: #67c23a;
      }
    }
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 16px;
  }

  .user-header {
    padding: 20px;

    .user-info {
      flex-direction: column;
      text-align: center;

      .user-avatar {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }

  .info-item,
  .stat-item,
  .activity-item,
  .task-item {
    flex-direction: column;
    align-items: flex-start;

    .info-value,
    .stat-value,
    .activity-status,
    .task-meta {
      margin-top: 8px;
    }
  }
}
</style>
