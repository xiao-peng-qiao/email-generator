import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';

const Landing = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  // 如果已认证，重定向到仪表板
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <Container>
        <Row className="py-5">
          <Col md={6} className="text-center text-md-start">
            <h1 className="display-4">
              邮箱生成器
            </h1>
            <p className="lead">
              快速生成临时邮箱账号和随机密码，保护您的隐私安全
            </p>
            <div className="my-3">
              <Button as={Link} to="/register" variant="primary" className="me-2">
                注册账号
              </Button>
              <Button as={Link} to="/generator" variant="light">
                立即生成临时邮箱
              </Button>
            </div>
          </Col>
          <Col md={6} className="text-center">
            <img
              src="https://via.placeholder.com/500x300?text=邮箱生成器"
              alt="邮箱生成器"
              className="img-fluid rounded"
              style={{ maxWidth: '100%' }}
            />
          </Col>
        </Row>

        <Row className="py-4">
          <Col md={4} className="mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                <h3>保护隐私</h3>
                <p>
                  使用临时邮箱注册各类网站和服务，避免垃圾邮件骚扰和个人信息泄露。
                </p>
              </div>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <i className="fas fa-bolt fa-3x text-primary mb-3"></i>
                <h3>快速便捷</h3>
                <p>
                  一键生成随机邮箱和强密码，无需注册即可使用，登录后可保存和管理多个邮箱。
                </p>
              </div>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <i className="fas fa-lock fa-3x text-primary mb-3"></i>
                <h3>安全可靠</h3>
                <p>
                  所有密码均采用强加密算法存储，邮箱生成采用多种主流邮箱服务提供商。
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Landing; 