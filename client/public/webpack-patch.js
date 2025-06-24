/**
 * webpack加载过程的全局修补脚本
 * 这个脚本会在webpack运行之前注入全局变量
 */
(function() {
  console.log('[webpack-patch] 开始修补webpack环境');

  // 1. 定义全局process对象
  if (!window.process) {
    window.process = {
      env: { 
        NODE_ENV: 'development',
      },
      browser: true,
      nextTick: function(cb) { setTimeout(cb, 0); },
      binding: function(name) {
        if (name === 'util') return { isBuffer: function() { return false; } };
        return {};
      },
      cwd: function() { return '/'; },
      platform: 'browser'
    };
    console.log('[webpack-patch] 已创建process对象');
  }

  // 2. 监听webpack加载
  var originalWebpack = window.webpackJsonp;
  if (originalWebpack) {
    console.log('[webpack-patch] 发现webpack，进行修补');
    window.webpackJsonp = function() {
      if (!window.process) {
        console.warn('[webpack-patch] 恢复process对象');
        window.process = {
          env: { NODE_ENV: 'development' },
          browser: true
        };
      }
      return originalWebpack.apply(this, arguments);
    };
  }

  // 3. 监听动态导入
  var originalImport = window.__webpack_require__;
  if (originalImport) {
    window.__webpack_require__ = function() {
      if (!window.process) {
        console.warn('[webpack-patch] 动态导入时恢复process对象');
        window.process = {
          env: { NODE_ENV: 'development' },
          browser: true
        };
      }
      return originalImport.apply(this, arguments);
    };
  }

  // 4. 设置一个周期性检查
  setInterval(function() {
    if (!window.process) {
      console.warn('[webpack-patch] 周期检查发现process丢失，重新创建');
      window.process = {
        env: { NODE_ENV: 'development' },
        browser: true
      };
    }
  }, 1000);

  console.log('[webpack-patch] webpack环境修补完成');
})(); 