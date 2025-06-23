import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const EmailGenerator = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [copied, setCopied] = useState({
    email: false,
    password: false
  });
  const [selectedProvider, setSelectedProvider] = useState('');

  // 生成随机邮箱
  const generateEmail = async () => {
    setLoading(true);
    try {
      let url = '/api/emails/random';
      if (selectedProvider) {
        url += `?provider=${selectedProvider}`;
      }

      const res = await axios.get(url);
      setEmailData(res.data);
      setGenerated(true);
      setLoading(false);
    } catch (err) {
      setAlert('生成邮箱失败', 'danger');
      setLoading(false);
    }
  };

  // 复制文本
  const handleCopy = (type) => {
    setCopied({ ...copied, [type]: true });
    setTimeout(() => {
      setCopied({ ...copied, [type]: false });
    }, 2000);
  };

  // 保存到账户
  const saveToAccount = async () => {
    if (!isAuthenticated) {
      setAlert('请先登录后再保存邮箱', 'info');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = {
        provider: emailData.provider,
        description: '从生成器创建'
      };

      await axios.post('/api/emails', body, config);
      setAlert('邮箱已保存到您的账户', 'success');
    } catch (err) {
      setAlert('保存邮箱失败', 'danger');
    }
  };

  return (
    <Container className="py-3">
      <h1 className="mb-4">临时邮箱生成器</h1>

      <Card className="mb-4">
        <Card.Body>
          <h3>选择邮箱提供商（可选）</h3>
          <Form>
            <Form.Group>
              <Form.Select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="mb-3"
              >
                <option value="">随机选择提供商</option>
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
                <option value="yahoo">Yahoo</option>
                <option value="qq">QQ邮箱</option>
                <option value="163">163邮箱</option>
                <option value="126">126邮箱</option>
                <option value="hotmail">Hotmail</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                onClick={generateEmail}
                disabled={loading}
              >
                {loading ? '生成中...' : '生成随机邮箱'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {generated && emailData && (
        <Card className="mb-4">
          <Card.Header>
            <h3>您的临时邮箱已生成</h3>
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col sm={4}>
                <strong>邮箱地址:</strong>
              </Col>
              <Col sm={6}>{emailData.email}</Col>
              <Col sm={2} className="text-end">
                <CopyToClipboard
                  text={emailData.email}
                  onCopy={() => handleCopy('email')}
                >
                  <Button variant="outline-primary" size="sm">
                    {copied.email ? <FaCheckCircle /> : <FaCopy />}
                  </Button>
                </CopyToClipboard>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <strong>密码:</strong>
              </Col>
              <Col sm={6}>{emailData.password}</Col>
              <Col sm={2} className="text-end">
                <CopyToClipboard
                  text={emailData.password}
                  onCopy={() => handleCopy('password')}
                >
                  <Button variant="outline-primary" size="sm">
                    {copied.password ? <FaCheckCircle /> : <FaCopy />}
                  </Button>
                </CopyToClipboard>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <strong>提供商:</strong>
              </Col>
              <Col sm={8}>{emailData.provider}</Col>
            </Row>

            <Alert variant="warning">
              <strong>注意:</strong> 此邮箱仅用于临时用途，请不要在重要账号使用。除非您登录并保存，否则页面刷新后信息将丢失。
            </Alert>

            <div className="d-grid gap-2">
              {isAuthenticated ? (
                <Button variant="success" onClick={saveToAccount}>
                  保存到我的账户
                </Button>
              ) : (
                <Button as={Link} to="/login" variant="success">
                  登录后保存
                </Button>
              )}
              <Button variant="primary" onClick={generateEmail}>
                重新生成
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {!isAuthenticated && (
        <Alert variant="info">
          <h4>想要保存邮箱信息？</h4>
          <p>
            登录后您可以保存生成的邮箱信息，随时查看和管理您的所有邮箱。
          </p>
          <Button as={Link} to="/register" variant="primary" className="me-2">
            立即注册
          </Button>
          <Button as={Link} to="/login" variant="outline-primary">
            登录
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default EmailGenerator; 