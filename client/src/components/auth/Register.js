import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
// 暂时注释掉 reCAPTCHA 相关导入
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  // 暂时注释掉 reCAPTCHA 相关代码
  // const { executeRecaptcha } = useGoogleReCaptcha();

  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  // 增加人机验证状态
  const [isHuman, setIsHuman] = useState(false);

  // 重定向逻辑
  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  // 表单字段变更
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 人机验证状态变更
  const handleHumanCheck = () => {
    setIsHuman(!isHuman);
  };

  // 表单提交
  const onSubmit = async e => {
    e.preventDefault();

    if (!isHuman) {
      setAlert('请完成人机验证', 'danger');
      return;
    }

    if (name === '' || email === '' || password === '') {
      setAlert('请填写所有必填字段', 'danger');
    } else if (password !== password2) {
      setAlert('两次输入的密码不匹配', 'danger');
    } else if (password.length < 6) {
      setAlert('密码长度至少为6位', 'danger');
    } else {
      try {
        register({ name, email, password });
      } catch (err) {
        console.error('注册失败:', err);
        setAlert('注册失败，请重试', 'danger');
      }
    }
  };

  // 如果已认证则重定向
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card className="shadow-sm" style={{ width: '420px' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">
              <i className="fas fa-user-plus me-2"></i>用户注册
            </h2>
            
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>用户名</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="请输入您的用户名"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>电子邮箱</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="请输入您的电子邮箱"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <Form.Text className="text-muted">
                  我们绝不会与其他人共享您的电子邮箱
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>密码</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="请输入密码 (至少6位)"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength="6"
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>确认密码</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="请再次输入密码"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  minLength="6"
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              {/* Cloudflare风格的人机验证 */}
              <div className="mb-4 p-3 border rounded bg-light">
                <div className="d-flex align-items-center">
                  <Form.Check 
                    type="checkbox" 
                    id="human-check"
                    checked={isHuman}
                    onChange={handleHumanCheck}
                    label="确认您是真人"
                    className="me-3"
                  />
                  <div className="ms-auto">
                    <img 
                      src="https://www.cloudflare.com/favicon.ico" 
                      alt="安全验证" 
                      style={{ width: '20px', height: '20px', marginRight: '5px' }} 
                    />
                    <span className="text-muted small">安全 · 无忧</span>
                  </div>
                </div>
              </div>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit">
                  <i className="fas fa-user-plus me-2"></i>注册
                </Button>
              </div>
              
              <p className="text-center mb-0">
                已有账号？<Link to="/login">立即登录</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Register; 