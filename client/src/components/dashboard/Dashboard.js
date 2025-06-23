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
    <Container>
      <h1 className="my-4">仪表板</h1>
      
      {user && (
        <Card className="mb-4">
          <Card.Body>
            <h2>欢迎, {user.name}</h2>
            <p>邮箱: {user.email}</p>
            <p>账号创建于: {new Date(user.date).toLocaleString('zh-CN')}</p>
          </Card.Body>
        </Card>
      )}

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h3>邮箱统计</h3>
              <p>您已创建 {emails ? emails.length : 0} 个邮箱</p>
              <Button as={Link} to="/emails/new" variant="primary">
                创建新邮箱
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h3>快速操作</h3>
              <div className="d-grid gap-2">
                <Button as={Link} to="/emails" variant="outline-primary">
                  <i className="fas fa-envelope"></i> 查看所有邮箱
                </Button>
                <Button as={Link} to="/generator" variant="outline-success">
                  <i className="fas fa-random"></i> 生成临时邮箱
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {emails && emails.length > 0 && (
        <Card>
          <Card.Body>
            <h3>最近创建的邮箱</h3>
            <div className="list-group">
              {emails.slice(0, 3).map(email => (
                <div key={email._id} className="list-group-item">
                  <div>
                    <strong>邮箱:</strong> {email.email}
                  </div>
                  <div>
                    <strong>创建时间:</strong> {new Date(email.date).toLocaleString('zh-CN')}
                  </div>
                </div>
              ))}
            </div>
            {emails.length > 3 && (
              <Button as={Link} to="/emails" variant="link" className="mt-2">
                查看更多...
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard; 