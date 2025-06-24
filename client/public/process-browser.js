// 这个文件模拟了process/browser模块
var process = {};

// 基本的process API
process.nextTick = function(fn) {
  setTimeout(fn, 0);
};
process.title = 'browser';
process.browser = true;
process.env = process.env || {};
process.argv = [];
process.version = ''; // node版本
process.versions = {};

// 仅限node环境的API的空实现
process.on = function() {};
process.addListener = function() {};
process.once = function() {};
process.off = function() {};
process.removeListener = function() {};
process.removeAllListeners = function() {};
process.emit = function() {};
process.prependListener = function() {};
process.prependOnceListener = function() {};
process.listeners = function() { return []; };
process.binding = function() { return {} };
process.cwd = function() { return '/' };
process.chdir = function() {};
process.umask = function() { return 0; };

// 确保在window存在时挂载到window上
if (typeof window !== 'undefined') {
  window.process = process;
}

// 供webpack等模块系统使用
module.exports = process; 