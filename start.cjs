const { spawn } = require('child_process')
const path = require('path')

console.log('正在启动系统...')
console.log('=====================================')

// 启动官网项目
const websiteProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.resolve(__dirname),
  stdio: 'inherit',
  shell: true
})

// 启动管理后台项目
const adminProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.resolve(__dirname, 'vue-element-admin-master', 'admin-master'),
  stdio: 'inherit',
  shell: true
})

// 处理官网项目的退出
websiteProcess.on('exit', (code) => {
  console.log(`官网项目退出，退出码: ${code}`)
})

// 处理管理后台项目的退出
adminProcess.on('exit', (code) => {
  console.log(`管理后台项目退出，退出码: ${code}`)
})

// 处理错误
websiteProcess.on('error', (error) => {
  console.error('启动官网项目时出错:', error)
})

adminProcess.on('error', (error) => {
  console.error('启动管理后台项目时出错:', error)
})

console.log('系统启动中，请稍候...')
console.log('=====================================')
console.log('官网地址: http://localhost:5173')
console.log('管理后台地址: http://localhost:9527')
console.log('=====================================')