import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// 修复process问题 - 使用我们自己创建的process模块
if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
  // 导入自定义process实现
  window.process = {
    env: { NODE_ENV: 'development' },
    browser: true,
    nextTick: function(cb) { setTimeout(cb, 0); }
  };
  
  // 兼容性提示
  console.log('已注入process全局变量', window.process);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 