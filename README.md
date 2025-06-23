# 邮箱生成器

一个用于生成随机邮箱和密码的网站应用，支持用户注册登录、保存邮箱信息、随机生成临时邮箱。

## 功能特点

- 生成随机邮箱和强密码
- 用户注册和登录系统
- 使用reCAPTCHA保护注册和登录页面
- 管理和保存生成的邮箱信息
- 复制邮箱和密码到剪贴板
- 响应式界面，适配各种设备

## 技术栈

- **前端**: React、React Router、React Bootstrap、Context API
- **后端**: Node.js、Express
- **数据库**: MongoDB
- **认证**: JWT (JSON Web Token)
- **安全**: bcrypt 密码加密、reCAPTCHA v3 人机验证

## 安装和运行

### 前提条件

- Node.js (>=12.x)
- MongoDB

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/email-generator.git
cd email-generator
```

2. 安装依赖

```bash
# 安装服务端依赖
npm install

# 安装客户端依赖
cd client
npm install
cd ..
```

3. 配置环境变量

创建 `.env` 文件，添加以下内容：

```
NODE_ENV=development
PORT=5000
MONGO_URI=你的MongoDB连接字符串
JWT_SECRET=你的JWT密钥
RECAPTCHA_SITE_KEY=你的reCAPTCHA站点密钥
RECAPTCHA_SECRET_KEY=你的reCAPTCHA秘密密钥
```

4. 运行应用

```bash
# 开发模式（同时运行前端和后端）
npm run dev-all

# 仅运行后端
npm run dev

# 仅运行前端
npm run client
```

5. 浏览器访问 `http://localhost:3000`

## 部署

项目可以部署到任何支持Node.js的平台，如Heroku、Netlify、Vercel等。

## 贡献

欢迎贡献代码！请创建Pull Request或提交Issue。

## 许可证

本项目使用 MIT 许可证 