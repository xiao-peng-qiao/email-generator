import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import EmailContext from '../../context/email/emailContext';
import Spinner from '../layout/Spinner';

const EmailList = () => {
  const emailContext = useContext(EmailContext);
  const { emails, getEmails, deleteEmail, loading, error } = emailContext;

  useEffect(() => {
    getEmails();
    // eslint-disable-next-line
  }, []);

  const handleDelete = id => {
    if (window.confirm('确定要删除这个邮箱吗？')) {
      deleteEmail(id);
      toast.success('邮箱已删除');
    }
  };

  const handleCopy = () => {
    toast.success('已复制到剪贴板');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className="py-4" style={{ maxWidth: '900px' }}>
      <h1 className="text-center mb-4">我的邮箱</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Badge bg="primary" className="fs-6">
            共 {emails ? emails.length : 0} 个邮箱
          </Badge>
        </div>
        <Button as={Link} to="/emails/new" variant="primary">
          <i className="fas fa-plus me-2"></i>创建新邮箱
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {emails && emails.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body className="text-center p-5">
            <i className="fas fa-envelope fa-3x text-muted mb-3"></i>
            <h3>暂无邮箱</h3>
            <p className="lead">您还没有创建任何邮箱</p>
            <Button as={Link} to="/emails/new" variant="primary">
              立即创建一个新邮箱
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="email-list">
          {emails.map(email => (
            <Card key={email._id} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={7}>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-envelope text-primary me-3 fa-2x"></i>
                      <div>
                        <h5 className="mb-1">{email.email}</h5>
                        <small className="text-muted">
                          <i className="far fa-clock me-1"></i>
                          创建于: {new Date(email.date).toLocaleString('zh-CN')}
                        </small>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="d-flex justify-content-md-end gap-2 mt-3 mt-md-0">
                      <CopyToClipboard text={email.email} onCopy={handleCopy}>
                        <Button variant="outline-secondary" size="sm">
                          <i className="far fa-copy me-1"></i>复制
                        </Button>
                      </CopyToClipboard>
                      <Button
                        as={Link}
                        to={`/emails/${email._id}`}
                        variant="outline-primary"
                        size="sm"
                      >
                        <i className="fas fa-eye me-1"></i>详情
                      </Button>
                      <Button
                        onClick={() => handleDelete(email._id)}
                        variant="outline-danger"
                        size="sm"
                      >
                        <i className="fas fa-trash-alt me-1"></i>删除
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default EmailList; 