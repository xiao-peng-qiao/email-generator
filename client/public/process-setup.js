// 这个文件将在React应用之前加载
(function() {
  // 检查全局process是否存在
  if (typeof window.process === 'undefined') {
    console.log('[process-setup] 正在创建全局process对象');
    
    // 创建process对象
    window.process = {
      env: { NODE_ENV: 'development' },
      browser: true,
      nextTick: function(cb) { setTimeout(cb, 0); },
      binding: function(name) {
        if (name === 'util') return { isBuffer: function() { return false; } };
        return {};
      },
      stdin: {},
      stdout: {},
      stderr: {},
      argv: [],
      version: '',
      versions: {},
      on: function() {},
      addListener: function() {},
      once: function() {},
      off: function() {},
      removeListener: function() {},
      removeAllListeners: function() {},
      emit: function() {},
      prependListener: function() {},
      prependOnceListener: function() {},
      listeners: function() { return []; },
      binding: function() {},
      cwd: function() { return '/'; },
      chdir: function() {},
      umask: function() { return 0; },
      platform: 'browser'
    };
  }
  
  // 检查全局global是否存在
  if (typeof window.global === 'undefined') {
    console.log('[process-setup] 正在创建全局global对象');
    window.global = window;
  }
  
  // 检查Buffer是否存在
  if (typeof window.Buffer === 'undefined') {
    console.log('[process-setup] 正在创建Buffer对象');
    window.Buffer = {
      isBuffer: function() { return false; }
    };
  }
  
  console.log('[process-setup] 环境检查完成');
})(); 