import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} 邮箱生成器 - 快速生成临时邮箱和随机密码
        </p>
        <p>
          <a href="https://github.com/yourusername/email-generator" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            GitHub项目
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 