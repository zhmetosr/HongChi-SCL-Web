import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null,
    token: null,
    roles: []
  }),

  getters: {
    hasToken: (state) => !!state.token,
    userName: (state) => state.userInfo?.name || '',
    userEmail: (state) => state.userInfo?.email || '',
    isAdmin: (state) => state.roles.includes('admin')
  },

  actions: {
    login(userData, token, roles = ['user']) {
      this.isLoggedIn = true
      this.userInfo = userData
      this.token = token
      this.roles = roles
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(userData))
      localStorage.setItem('roles', JSON.stringify(roles))
    },

    logout() {
      this.isLoggedIn = false
      this.userInfo = null
      this.token = null
      this.roles = []
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('roles')
    },

    initAuth() {
      const token = localStorage.getItem('token')
      const userInfo = localStorage.getItem('userInfo')
      const roles = localStorage.getItem('roles')
      if (token && userInfo) {
        this.isLoggedIn = true
        this.userInfo = JSON.parse(userInfo)
        this.token = token
        this.roles = roles ? JSON.parse(roles) : ['user']
      }
    }
  }
})
