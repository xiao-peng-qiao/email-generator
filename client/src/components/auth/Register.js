import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

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

  // 表单提交
  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('两次输入的密码不匹配', 'danger');
    } else {
      // 执行reCAPTCHA
      if (!executeRecaptcha) {
        setAlert('reCAPTCHA尚未准备好', 'danger');
        return;
      }
      
      try {
        const recaptchaToken = await executeRecaptcha('register');
        register({ name, email, password, recaptchaToken });
      } catch (error) {
        console.error('reCAPTCHA执行失败:', error);
        setAlert('人机验证失败，请刷新页面重试', 'danger');
      }
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
          <h2 className="text-center mb-4">注册账号</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type="text"
                placeholder="请输入您的姓名"
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
                placeholder="请输入您的邮箱"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                placeholder="请设置密码"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
                required
              />
              <Form.Text className="text-muted">
                密码长度至少为6个字符
              </Form.Text>
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
              />
            </Form.Group>

            <Alert variant="info">
              点击注册按钮即表示您同意我们的使用条款和隐私政策
            </Alert>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                注册
              </Button>
            </div>
          </Form>
          
          <div className="text-center mt-3">
            已有账号？ <Link to="/login">立即登录</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register; 