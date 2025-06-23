const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Email = require('../models/Email');
const User = require('../models/User');

// 邮箱提供商列表
const emailProviders = [
  { name: 'gmail', domain: 'gmail.com' },
  { name: 'outlook', domain: 'outlook.com' },
  { name: 'yahoo', domain: 'yahoo.com' },
  { name: 'qq', domain: 'qq.com' },
  { name: '163', domain: '163.com' },
  { name: '126', domain: '126.com' },
  { name: 'hotmail', domain: 'hotmail.com' }
];

// 生成随机字符串
const generateRandomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// 生成随机邮箱
const generateRandomEmail = (provider) => {
  const selectedProvider = provider 
    ? emailProviders.find(p => p.name === provider) 
    : emailProviders[Math.floor(Math.random() * emailProviders.length)];
  
  const username = generateRandomString(10);
  return {
    email: `${username}@${selectedProvider.domain}`,
    provider: selectedProvider.name
  };
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

// @route   GET api/emails
// @desc    获取所有邮箱
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const emails = await Email.find({ user: req.user.id }).sort({ date: -1 });
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// @route   POST api/emails
// @desc    创建新邮箱
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('description', '描述是可选的').optional()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { provider, description } = req.body;
      
      // 生成随机邮箱和密码
      const randomEmail = generateRandomEmail(provider);
      const randomPassword = generateRandomPassword();
      
      const newEmail = new Email({
        user: req.user.id,
        email: randomEmail.email,
        password: randomPassword,
        provider: randomEmail.provider,
        description
      });

      const email = await newEmail.save();
      res.json(email);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('服务器错误');
    }
  }
);

// @route   GET api/emails/random
// @desc    生成随机邮箱（不保存）
// @access  Public
router.get('/random', async (req, res) => {
  try {
    const { provider } = req.query;
    
    // 生成随机邮箱和密码
    const randomEmail = generateRandomEmail(provider);
    const randomPassword = generateRandomPassword();
    
    res.json({
      email: randomEmail.email,
      password: randomPassword,
      provider: randomEmail.provider
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// @route   GET api/emails/:id
// @desc    获取单个邮箱
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ msg: '邮箱未找到' });
    }

    // 确保用户拥有邮箱
    if (email.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '用户未授权' });
    }

    res.json(email);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '邮箱未找到' });
    }
    res.status(500).send('服务器错误');
  }
});

// @route   DELETE api/emails/:id
// @desc    删除邮箱
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ msg: '邮箱未找到' });
    }

    // 确保用户拥有邮箱
    if (email.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '用户未授权' });
    }

    await email.remove();
    res.json({ msg: '邮箱已删除' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '邮箱未找到' });
    }
    res.status(500).send('服务器错误');
  }
});

// @route   PUT api/emails/:id
// @desc    更新邮箱
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { description } = req.body;
    
    let email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ msg: '邮箱未找到' });
    }

    // 确保用户拥有邮箱
    if (email.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '用户未授权' });
    }

    // 更新描述
    email.description = description;
    await email.save();

    res.json(email);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '邮箱未找到' });
    }
    res.status(500).send('服务器错误');
  }
});

module.exports = router; 