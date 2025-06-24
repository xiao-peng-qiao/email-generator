// 这个脚本将在HTML中直接加载，用于确保process对象提前定义
(function() {
  // 如果process对象已经存在，则不做任何操作
  if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
    // 创建process对象
    var processObj = {
      env: { NODE_ENV: 'development' },
      browser: true,
      nextTick: function(fn) { setTimeout(fn, 0); },
      title: 'browser',
      version: '',
      versions: {},
      platform: 'browser',
      argv: [],
      on: function() {},
      addListener: function() {},
      once: function() {},
      off: function() {},
      removeListener: function() {},
      removeAllListeners: function() {},
      emit: function() {},
      binding: function(name) {
        if (name === 'util') return { isBuffer: function() { return false; } };
        return {};
      },
      cwd: function() { return '/' },
      chdir: function() {},
      umask: function() { return 0; }
    };
    
    // 使用defineProperty确保process不被覆盖
    try {
      Object.defineProperty(window, 'process', {
        value: processObj,
        writable: true,
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      // 如果defineProperty失败，则简单赋值
      window.process = processObj;
    }
    
    // 确保global也被正确定义
    window.global = window;
    
    console.log('process-direct-shim: 进程对象已初始化');
  } else {
    console.log('process-direct-shim: 进程对象已存在');
  }
})(); 