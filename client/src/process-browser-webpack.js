// 这个文件将被用作process/browser的替代品
// 如果webpack尝试加载process/browser，它会找到这个文件

// 确保全局process对象已存在
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: { NODE_ENV: 'development' },
    browser: true,
    nextTick: function(cb) { setTimeout(cb, 0); }
  };
}

// 导出process对象
module.exports = window.process; 