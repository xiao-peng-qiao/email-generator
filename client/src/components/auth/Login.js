import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    // 执行reCAPTCHA
    if (!executeRecaptcha) {
      setAlert('reCAPTCHA尚未准备好', 'danger');
      return;
    }
    
    try {
      const recaptchaToken = await executeRecaptcha('login');
      login({ email, password, recaptchaToken });
    } catch (error) {
      console.error('reCAPTCHA执行失败:', error);
      setAlert('人机验证失败，请刷新页面重试', 'danger');
    }
  };

  // 如果已认证则重定向
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container className="py-3">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">登录账号</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>电子邮箱</Form.Label>
              <Form.Control
                type="email"
                placeholder="请输入您的邮箱"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                placeholder="请输入密码"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                登录
              </Button>
            </div>
          </Form>
          
          <div className="text-center mt-3">
            没有账号？ <Link to="/register">立即注册</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login; 