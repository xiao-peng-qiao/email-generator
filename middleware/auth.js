const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 从请求头获取token
  const token = req.header('x-auth-token');

  // 检查是否有token
  if (!token) {
    return res.status(401).json({ msg: '没有令牌，授权被拒绝' });
  }

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: '令牌无效' });
  }
}; 