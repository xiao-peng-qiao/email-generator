// 该脚本用于解决Webpack中process对象缺失问题
(function() {
  try {
    // 创建或保留现有process对象
    window.process = window.process || {
      env: { 
        NODE_ENV: 'development' 
      },
      browser: true,
      nextTick: function(cb) { setTimeout(cb, 0); },
      title: 'browser'
    };
    
    // 确保process.env存在
    if (!window.process.env) {
      window.process.env = { 
        NODE_ENV: 'development' 
      };
    }
    
    // 确保global对象存在
    window.global = window;
    
    console.log('process对象已初始化');
  } catch (e) {
    console.error('初始化process对象失败:', e);
  }
})(); 