const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 初始化Express应用
const app = express();

// 中间件
app.use(express.json());
app.use(cors());

// 设置strictQuery为false
mongoose.set('strictQuery', false);

// 连接MongoDB数据库
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/email-generator', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB连接成功');
  } catch (err) {
    console.error('MongoDB连接失败:', err.message);
    process.exit(1);
  }
};

connectDB();

// 定义路由
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/emails', require('./routes/emails'));

// 在生产环境中提供静态资源
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// 设置端口并启动服务器
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`)); 