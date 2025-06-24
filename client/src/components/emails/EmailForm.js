import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EmailContext from '../../context/email/emailContext';
import AlertContext from '../../context/alert/alertContext';

const EmailForm = () => {
  const emailContext = useContext(EmailContext);
  const alertContext = useContext(AlertContext);
  const history = useHistory();

  const { addEmail, current, clearCurrent, updateEmail } = emailContext;
  const { setAlert } = alertContext;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    provider: 'outlook.com',
    description: ''
  });

  useEffect(() => {
    if (current) {
      setFormData(current);
    } else {
      setFormData({
        email: '',
        password: '',
        provider: 'outlook.com',
        description: ''
      });
    }
  }, [current]);

  const { email, password, provider, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('请填写邮箱和密码');
      return;
    }

    if (current) {
      updateEmail(formData);
      setAlert('邮箱已更新', 'success');
    } else {
      addEmail(formData);
      setAlert('邮箱已创建', 'success');
    }

    clearAll();
    history.push('/emails');
  };

  const clearAll = () => {
    clearCurrent();
    setFormData({
      email: '',
      password: '',
      provider: 'outlook.com',
      description: ''
    });
  };

  const generateRandomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const generateEmail = () => {
    const username = generateRandomString(8);
    setFormData({
      ...formData,
      email: `${username}@${provider}`
    });
  };

  const generatePassword = () => {
    setFormData({
      ...formData,
      password: generateRandomPassword()
    });
  };

  const handleCopy = () => {
    toast.success('已复制到剪贴板');
  };

  return (
    <Container className="py-4" style={{ maxWidth: '700px' }}>
      <h1 className="text-center mb-4">{current ? '编辑邮箱' : '创建新邮箱'}</h1>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={onSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md={12} className="mb-4">
                <Form.Label>邮箱地址</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="请输入邮箱地址"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                  <Button 
                    variant="outline-secondary"
                    onClick={generateEmail}
                    title="生成随机邮箱地址"
                  >
                    <i className="fas fa-random"></i>
                  </Button>
                  {email && (
                    <CopyToClipboard text={email} onCopy={handleCopy}>
                      <Button variant="outline-primary" title="复制邮箱地址">
                        <i className="far fa-copy"></i>
                      </Button>
                    </CopyToClipboard>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md={12} className="mb-4">
                <Form.Label>密码</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="请输入邮箱密码"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    autoComplete="new-password"
                  />
                  <Button 
                    variant="outline-secondary"
                    onClick={generatePassword}
                    title="生成随机密码"
                  >
                    <i className="fas fa-dice"></i>
                  </Button>
                  {password && (
                    <CopyToClipboard text={password} onCopy={handleCopy}>
                      <Button variant="outline-primary" title="复制密码">
                        <i className="far fa-copy"></i>
                      </Button>
                    </CopyToClipboard>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md={6} className="mb-3">
                <Form.Label>邮箱提供商</Form.Label>
                <Form.Select
                  name="provider"
                  value={provider}
                  onChange={onChange}
                >
                  <option value="outlook.com">Outlook.com</option>
                  <option value="gmail.com">Gmail.com</option>
                  <option value="yahoo.com">Yahoo.com</option>
                  <option value="protonmail.com">ProtonMail.com</option>
                  <option value="zoho.com">Zoho.com</option>
                  <option value="yandex.com">Yandex.com</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6} className="mb-3">
                <Form.Label>描述（可选）</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="输入描述信息（用途等）"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={clearAll}>
                {current ? '取消' : '重置'}
              </Button>
              <Button type="submit" variant="primary">
                <i className="fas fa-save me-2"></i>
                {current ? '更新邮箱' : '保存邮箱'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailForm; 