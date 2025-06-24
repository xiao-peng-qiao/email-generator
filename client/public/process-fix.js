// 修复process未定义错误
window.process = {
  env: {
    NODE_ENV: 'development'
  }
}; 