import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import EmailContext from '../../context/email/emailContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const emailContext = useContext(EmailContext);
  const { emails, getEmails, loading } = emailContext;

  useEffect(() => {
    loadUser();
    getEmails();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="dashboard-container" style={{ maxWidth: '900px' }}>
      <h1 className="my-4 text-center">个人仪表盘</h1>
      
      {user && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h2>欢迎, {user.name}</h2>
            <p><i className="fas fa-envelope me-2"></i>{user.email}</p>
            <p><i className="fas fa-calendar-alt me-2"></i>账号创建于: {new Date(user.date).toLocaleString('zh-CN')}</p>
          </Card.Body>
        </Card>
      )}

      <Row>
        <Col md={12} lg={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <h3 className="mb-3"><i className="fas fa-chart-bar me-2"></i>邮箱统计</h3>
              <p className="mb-4 lead">您已创建 <strong>{emails ? emails.length : 0}</strong> 个邮箱</p>
              <div className="mt-auto">
                <Button as={Link} to="/emails/new" variant="primary" className="w-100">
                  <i className="fas fa-plus me-2"></i>创建新邮箱
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h3 className="mb-3"><i className="fas fa-info-circle me-2"></i>账户信息</h3>
              {user && (
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-user me-2 text-primary"></i>用户名: {user.name}</li>
                  <li className="mb-2"><i className="fas fa-envelope-open me-2 text-primary"></i>邮箱: {user.email}</li>
                  <li><i className="fas fa-shield-alt me-2 text-primary"></i>账号状态: <span className="badge bg-success">已验证</span></li>
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {emails && emails.length > 0 && (
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <h3 className="mb-0"><i className="fas fa-history me-2"></i>最近创建的邮箱</h3>
          </Card.Header>
          <Card.Body>
            <div className="list-group">
              {emails.slice(0, 3).map(email => (
                <div key={email._id} className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">{email.email}</h5>
                      <small className="text-muted">
                        <i className="far fa-clock me-1"></i>
                        {new Date(email.date).toLocaleString('zh-CN')}
                      </small>
                    </div>
                    <Button as={Link} to={`/emails/${email._id}`} variant="outline-primary" size="sm">
                      查看详情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {emails.length > 3 && (
              <div className="text-center mt-3">
                <Button as={Link} to="/emails" variant="outline-secondary">
                  <i className="fas fa-list me-2"></i>查看所有邮箱
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard; 