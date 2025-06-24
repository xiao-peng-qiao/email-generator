/**
 * 这个脚本用于修补React和ReactDOM，确保它们能够正确使用process对象
 */
(function() {
  // 在React加载前设置全局变量
  console.log('[react-patch] 开始修补React环境');

  // 保存原始ReactDOM.render方法
  const originalCreateRoot = window.ReactDOM && window.ReactDOM.createRoot;
  const originalRender = window.ReactDOM && window.ReactDOM.render;
  
  // 设置全局环境变量
  window.__REACT_PATCHED__ = true;
  window.__REACT_ENV__ = {
    NODE_ENV: 'development',
    BROWSER: true
  };
  
  // 确保process存在
  if (!window.process) {
    console.log('[react-patch] 创建缺失的process对象');
    window.process = {
      env: { NODE_ENV: 'development' },
      browser: true,
      nextTick: function(cb) { setTimeout(cb, 0); },
      binding: function() { return {}; }
    };
  }
  
  // 监听ReactDOM加载
  Object.defineProperty(window, 'ReactDOM', {
    configurable: true,
    get: function() {
      return this._reactDOMPatched || {};
    },
    set: function(reactDOMLib) {
      console.log('[react-patch] ReactDOM被加载，应用补丁');
      // 保存原始方法
      const originalRender = reactDOMLib.render;
      const originalCreateRoot = reactDOMLib.createRoot;
      
      // 如果需要，修补render方法
      if (originalRender) {
        reactDOMLib.render = function() {
          console.log('[react-patch] 使用修补版ReactDOM.render');
          if (!window.process) {
            window.process = { env: { NODE_ENV: 'development' } };
          }
          return originalRender.apply(this, arguments);
        };
      }
      
      // 如果需要，修补createRoot方法
      if (originalCreateRoot) {
        reactDOMLib.createRoot = function() {
          console.log('[react-patch] 使用修补版ReactDOM.createRoot');
          if (!window.process) {
            window.process = { env: { NODE_ENV: 'development' } };
          }
          return originalCreateRoot.apply(this, arguments);
        };
      }
      
      // 保存并返回修补后的ReactDOM
      this._reactDOMPatched = reactDOMLib;
      return reactDOMLib;
    }
  });
  
  console.log('[react-patch] React环境修补完成');
})(); 