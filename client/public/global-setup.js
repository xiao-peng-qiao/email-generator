// 全局设置脚本 - 处理webpack打包前的全局变量
(function() {
  console.log('[global-setup] 开始加载全局设置');
  
  // 1. 定义process对象
  if (typeof window.process === 'undefined') {
    window.process = {
      env: { NODE_ENV: 'development' },
      browser: true,
      nextTick: function(cb) { setTimeout(cb, 0); },
      binding: function(name) {
        if (name === 'util') return { isBuffer: function() { return false; } };
        return {};
      },
      cwd: function() { return '/'; }
    };
    console.log('[global-setup] 已创建process对象');
  }
  
  // 2. 设置webpack兼容性变量
  window.__webpack_public_path__ = window.__webpack_public_path__ || '/';
  window.__webpack_require__ = window.__webpack_require__ || function() { 
    throw new Error('__webpack_require__未定义'); 
  };
  
  // 3. 确保其他webpack相关的全局变量
  window.global = window;
  window.process.browser = true;
  window.Buffer = window.Buffer || { isBuffer: function() { return false; } };
  
  // 4. 处理模块系统相关
  window.module = window.module || { exports: {} };
  window.exports = window.exports || {};
  window.require = window.require || function(moduleName) {
    console.warn('[global-setup] 尝试require:' + moduleName);
    return {};
  };
  
  console.log('[global-setup] 全局设置完成');
})(); 