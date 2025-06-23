import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaTrash, FaEdit } from 'react-icons/fa';
import EmailContext from '../../context/email/emailContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';

const EmailList = () => {
  const emailContext = useContext(EmailContext);
  const alertContext = useContext(AlertContext);

  const { emails, getEmails, deleteEmail, loading, setCurrent, clearCurrent } = emailContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    getEmails();
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    if (window.confirm('确定要删除此邮箱吗？')) {
      deleteEmail(id);
      clearCurrent();
      setAlert('邮箱已删除', 'success');
    }
  };

  const onCopy = (text) => {
    setAlert('已复制到剪贴板', 'success');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>我的邮箱列表</h1>
        <Button as={Link} to="/emails/new" variant="primary">
          <i className="fas fa-plus"></i> 创建新邮箱
        </Button>
      </div>

      {emails && emails.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h3>您还没有添加任何邮箱</h3>
            <p>点击"创建新邮箱"按钮来添加您的第一个邮箱</p>
            <Button as={Link} to="/emails/new" variant="primary">
              创建新邮箱
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          {emails && emails.map(email => (
            <Card key={email._id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={9}>
                    <h4>{email.email}</h4>
                    <p>
                      <Badge bg="primary" className="me-2">
                        {email.provider}
                      </Badge>
                      {email.description && (
                        <span className="text-muted">描述: {email.description}</span>
                      )}
                    </p>
                    <div className="d-flex mb-3">
                      <div className="me-4">
                        <strong>密码:</strong> {email.password}
                      </div>
                      <div>
                        <strong>创建时间:</strong> {new Date(email.date).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="d-flex flex-column justify-content-center align-items-end">
                    <div className="mb-2">
                      <CopyToClipboard text={email.email} onCopy={() => onCopy(email.email)}>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          <FaCopy /> 复制邮箱
                        </Button>
                      </CopyToClipboard>
                    </div>
                    <div className="mb-2">
                      <CopyToClipboard text={email.password} onCopy={() => onCopy(email.password)}>
                        <Button variant="outline-success" size="sm" className="me-2">
                          <FaCopy /> 复制密码
                        </Button>
                      </CopyToClipboard>
                    </div>
                    <div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(email._id)}
                      >
                        <FaTrash /> 删除
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default EmailList; 