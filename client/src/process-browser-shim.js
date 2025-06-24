// 这是一个process/browser的简单垫片
module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  browser: true,
  nextTick: function(cb) { setTimeout(cb, 0); },
  title: 'browser',
  version: '',
  versions: {},
  on: function() {},
  addListener: function() {},
  once: function() {},
  off: function() {},
  removeListener: function() {},
  removeAllListeners: function() {},
  emit: function() {},
  binding: function() { return {}; },
  cwd: function() { return '/'; },
  chdir: function() {},
  umask: function() { return 0; },
  platform: 'browser'
}; 