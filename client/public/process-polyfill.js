/**
 * Process polyfill 为浏览器提供process对象
 * 解决"process is not defined"错误
 */
(function() {
  if (typeof window !== 'undefined' && !window.process) {
    window.process = {
      env: {
        NODE_ENV: 'development',
        PUBLIC_URL: window.location.origin,
      },
      nextTick: function(callback) {
        setTimeout(callback, 0);
      },
      browser: true,
      version: '',
      platform: 'browser'
    };
  }
})(); 