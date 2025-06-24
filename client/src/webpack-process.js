// 这个文件专门用于为webpack提供process模块
const processPolyfill = require('process/browser');
window.process = processPolyfill; 