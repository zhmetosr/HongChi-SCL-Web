import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // 先从 Cookies 中获取
  let token = Cookies.get(TokenKey)
  // 如果 Cookies 中没有，从 localStorage 中获取（用于从官网同步登录状态）
  if (!token) {
    token = localStorage.getItem(TokenKey)
  }
  return token
}

export function setToken(token) {
  // 同时设置到 Cookies 和 localStorage
  Cookies.set(TokenKey, token)
  localStorage.setItem(TokenKey, token)
  return token
}

export function removeToken() {
  // 同时从 Cookies 和 localStorage 中删除
  Cookies.remove(TokenKey)
  localStorage.removeItem(TokenKey)
  return true
}
