const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Email = require('./models/Email');

// 设置strictQuery为false，消除警告
mongoose.set('strictQuery', false);

// MongoDB连接URI
const mongoURI = 'mongodb://127.0.0.1:27017/email-generator';

// 连接到MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 超时设置为5秒
})
.then(() => console.log('MongoDB连接成功，开始初始化数据...'))
.catch(err => {
  console.error('MongoDB连接失败:', err.message);
  process.exit(1);
});

// 生成随机字符串
const generateRandomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// 生成随机密码
const generateRandomPassword = (length = 12) => {
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = upperChars + lowerChars + numbers + symbols;
  
  // 确保密码包含至少一个大写字母、小写字母、数字和符号
  let password = '';
  password += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
  password += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  // 生成剩余字符
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // 打乱密码字符顺序
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

// 创建测试用户和示例邮箱
const seedDatabase = async () => {
  try {
    // 清空现有数据
    await User.deleteMany({});
    await Email.deleteMany({});
    
    console.log('已清空现有数据');

    // 创建测试用户
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    
    const testUser = new User({
      name: '测试用户',
      email: 'test@example.com',
      password: hashedPassword
    });
    
    const savedUser = await testUser.save();
    console.log('创建测试用户成功:', savedUser.name);

    // 为测试用户创建示例邮箱
    const emailProviders = [
      { name: 'gmail', domain: 'gmail.com' },
      { name: 'outlook', domain: 'outlook.com' },
      { name: 'yahoo', domain: 'yahoo.com' }
    ];

    for (let i = 0; i < 3; i++) {
      const provider = emailProviders[i];
      const username = generateRandomString(8);
      const email = `${username}@${provider.domain}`;
      const password = generateRandomPassword();
      
      const newEmail = new Email({
        user: savedUser._id,
        email: email,
        password: password,
        provider: provider.name,
        description: `示例邮箱 ${i+1}`
      });
      
      await newEmail.save();
      console.log(`创建示例邮箱成功: ${email}`);
    }

    console.log('数据库初始化完成！');
    console.log('\n测试用户登录信息:');
    console.log('邮箱: test@example.com');
    console.log('密码: 123456');
    
    // 关闭数据库连接
    mongoose.connection.close();
    console.log('数据库连接已关闭');
    
  } catch (err) {
    console.error('数据库初始化失败:', err);
    process.exit(1);
  }
};

// 执行数据库初始化
seedDatabase(); 