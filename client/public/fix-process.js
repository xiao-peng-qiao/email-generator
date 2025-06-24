// 创建全面的process polyfill
(function() {
  if (typeof window !== 'undefined') {
    // 先检查是否已定义process
    const processAlreadyDefined = typeof window.process !== 'undefined';
    if (!processAlreadyDefined) {
      const processImpl = {
        env: {
          NODE_ENV: 'development'
        },
        nextTick: function(cb) { setTimeout(cb, 0); },
        browser: true,
        version: '',
        versions: {},
        platform: 'browser',
        _tickCallback: function() {},
        stdout: {},
        stderr: {},
        title: 'browser',
        argv: [],
        execArgv: [],
        pid: 1,
        arch: 'x64',
        execPath: '/',
        chdir: function() {},
        cwd: function() { return '/'; },
        exit: function() {},
        binding: function(name) {
          if (name === 'util') return { isBuffer: function() { return false; } };
          return {};
        }
      };
      Object.defineProperty(window, 'process', {
        value: processImpl,
        enumerable: true,
        configurable: false,
        writable: false
      });
    }
    // 确保还有Buffer对象
    if (typeof window.Buffer === 'undefined') {
      window.Buffer = {
        isBuffer: function() { return false; }
      };
    }
  }
})(); 