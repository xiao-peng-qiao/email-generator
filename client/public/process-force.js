/**
 * 这个脚本将强制全局设置process变量，并使其不可修改
 */
console.log("强制创建process变量...");

// 定义process对象
window.forceDefineProcess = function() {
  var processObj = {
    env: {
      NODE_ENV: 'development'
    },
    browser: true,
    nextTick: function(fn) { setTimeout(fn, 0); },
    cwd: function() { return '/' },
    binding: function() { return {}; },
    title: 'browser',
    argv: []
  };

  try {
    Object.defineProperty(window, 'process', {
      value: processObj,
      configurable: false,
      enumerable: true,
      writable: false
    });
    console.log("process变量已被锁定并保护");
  } catch(e) {
    console.error("无法锁定process变量", e);
    window.process = processObj;
  }
};

// 立即执行
window.forceDefineProcess();

// 每100ms检查一次
setInterval(function() {
  if (!window.process || !window.process.env) {
    console.warn("process变量丢失，重新定义");
    window.forceDefineProcess();
  }
}, 100);

// 为webpack特殊处理
window.__webpack_process = window.process; 