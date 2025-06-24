/**
 * 这个文件为webpack和其他模块提供process polyfill
 */
window.process = {
  env: {
    NODE_ENV: 'development' 
  }
}; 