import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center my-5">
      <h1 className="display-4">
        <i className="fas fa-exclamation-triangle text-danger"></i> 404 找不到页面
      </h1>
      <p className="lead">抱歉，您访问的页面不存在</p>
      <Link to="/" className="btn btn-primary">
        返回首页
      </Link>
    </div>
  );
};

export default NotFound; 