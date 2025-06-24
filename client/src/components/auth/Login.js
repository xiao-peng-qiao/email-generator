import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  // const { executeRecaptcha } = useGoogleReCaptcha();

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  // 添加人机验证状态
  const [isHuman, setIsHuman] = useState(false);

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

  // 人机验证状态变更
  const handleHumanCheck = () => {
    setIsHuman(!isHuman);
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // 检查人机验证
    if (!isHuman) {
      setAlert('请完成人机验证', 'danger');
      return;
    }
    
    if (!email || !password) {
      setAlert('请填写所有字段', 'danger');
    } else {
      try {
        // 移除reCAPTCHA验证，直接登录
        login({ email, password });
      } catch (error) {
        console.error('登录失败:', error);
        setAlert('登录失败，请重试', 'danger');
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
        <Card className="shadow-sm" style={{ width: '380px' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">
              <i className="fas fa-user-circle me-2"></i>用户登录
            </h2>

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
                  placeholder="请输入您的密码" 
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  autoComplete="current-password"
                />
              </Form.Group>

              {/* 简化版人机验证 */}
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
                    <i className="fas fa-shield-alt text-primary me-1"></i>
                    <span className="text-muted small">安全验证</span>
                  </div>
                </div>
              </div>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit">
                  <i className="fas fa-sign-in-alt me-2"></i>登录
                </Button>
              </div>
              
              <p className="text-center mb-0">
                还没有账号？ <Link to="/register">立即注册</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login; 