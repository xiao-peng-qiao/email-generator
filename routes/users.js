const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// 我们暂时注释掉reCAPTCHA部分，以便能够启动服务器
// const Recaptcha = require('recaptcha-v3');
// 
// // 初始化reCAPTCHA
// const recaptcha = new Recaptcha({
//   siteKey: process.env.RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // 使用测试密钥
//   secretKey: process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // 使用测试密钥
// });

// @route   POST api/users
// @desc    注册用户
// @access  Public
router.post(
  '/',
  [
    check('name', '请输入姓名').not().isEmpty(),
    check('email', '请输入有效的邮箱').isEmail(),
    check('password', '请输入至少6个字符的密码').isLength({ min: 6 }),
    // 暂时移除recaptcha检查
    // check('recaptchaToken', '人机验证令牌是必需的').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // 去掉recaptchaToken

    try {
      // 暂时移除reCAPTCHA验证
      // // 验证reCAPTCHA
      // const recaptchaResult = await recaptcha.validate(recaptchaToken);
      // 
      // if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      //   return res.status(400).json({ msg: '人机验证失败，请重试' });
      // }

      // 检查用户是否已存在
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: '用户已经存在' });
      }

      // 创建新用户
      user = new User({
        name,
        email,
        password
      });

      // 加密密码
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // 保存用户
      await user.save();

      // 返回JWT令牌
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'mysecrettoken',
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('服务器错误');
    }
  }
);

module.exports = router; 