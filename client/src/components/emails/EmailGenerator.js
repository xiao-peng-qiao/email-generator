import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import EmailContext from '../../context/email/emailContext';
import AuthContext from '../../context/auth/authContext';

const EmailGenerator = () => {
  const emailContext = useContext(EmailContext);
  const authContext = useContext(AuthContext);
  const { addEmail } = emailContext;
  const { isAuthenticated } = authContext;

  const [generatedEmail, setGeneratedEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [provider, setProvider] = useState('outlook.com');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);

  const generateRandomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateRandomPassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // 确保包含至少一个数字、符号和大写（如果选择了）
    if (includeNumbers && !/\d/.test(password)) {
      const pos = Math.floor(Math.random() * password.length);
      password = password.substring(0, pos) + Math.floor(Math.random() * 10) + password.substring(pos + 1);
    }

    if (includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>\/?]/.test(password)) {
      const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const pos = Math.floor(Math.random() * password.length);
      password = password.substring(0, pos) + symbols.charAt(Math.floor(Math.random() * symbols.length)) + password.substring(pos + 1);
    }

    if (includeUppercase && !/[A-Z]/.test(password)) {
      const pos = Math.floor(Math.random() * password.length);
      const upperChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
      password = password.substring(0, pos) + upperChar + password.substring(pos + 1);
    }

    return password;
  };

  const handleGenerate = () => {
    const username = generateRandomString(8);
    const email = `${username}@${provider}`;
    const password = generateRandomPassword();

    setGeneratedEmail(email);
    setGeneratedPassword(password);
  };

  const handleSave = () => {
    if (!generatedEmail || !generatedPassword) {
      toast.error('请先生成邮箱和密码');
      return;
    }

    if (!isAuthenticated) {
      toast.info('请先登录或注册以保存邮箱');
      return;
    }

    addEmail({
      email: generatedEmail,
      password: generatedPassword,
      provider: provider
    });
    
    toast.success('邮箱已成功保存');
  };

  const handleCopy = () => {
    toast.success('已复制到剪贴板');
  };

  return (
    <Container className="py-4" style={{ maxWidth: '700px' }}>
      <h1 className="text-center mb-4">随机邮箱生成器</h1>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-light">
          <h4 className="mb-0"><i className="fas fa-sliders-h me-2"></i>生成选项</h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>邮箱提供商</Form.Label>
                  <Form.Select 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  >
                    <option value="outlook.com">Outlook.com</option>
                    <option value="gmail.com">Gmail.com</option>
                    <option value="yahoo.com">Yahoo.com</option>
                    <option value="protonmail.com">ProtonMail.com</option>
                    <option value="zoho.com">Zoho.com</option>
                    <option value="yandex.com">Yandex.com</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>密码长度: {passwordLength}</Form.Label>
                  <Form.Range 
                    min={8}
                    max={24}
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={12}>
                <div className="d-flex flex-wrap">
                  <Form.Check 
                    type="checkbox"
                    label="包含数字"
                    className="me-4 mb-2"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                  />
                  <Form.Check 
                    type="checkbox"
                    label="包含特殊字符"
                    className="me-4 mb-2"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                  />
                  <Form.Check 
                    type="checkbox"
                    label="包含大写字母"
                    className="me-4 mb-2"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />
                </div>
              </Col>
            </Row>
          </Form>
          
          <div className="text-center mt-4">
            <Button variant="primary" size="lg" onClick={handleGenerate}>
              <i className="fas fa-bolt me-2"></i>生成随机邮箱
            </Button>
          </div>
        </Card.Body>
      </Card>

      {(generatedEmail || generatedPassword) && (
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <h4 className="mb-0"><i className="fas fa-check-circle me-2"></i>生成结果</h4>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>随机邮箱地址</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={generatedEmail}
                      readOnly
                    />
                    <CopyToClipboard text={generatedEmail} onCopy={handleCopy}>
                      <Button variant="outline-primary">
                        <i className="far fa-copy me-1"></i>复制
                      </Button>
                    </CopyToClipboard>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>随机密码</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={generatedPassword}
                      readOnly
                    />
                    <CopyToClipboard text={generatedPassword} onCopy={handleCopy}>
                      <Button variant="outline-primary">
                        <i className="far fa-copy me-1"></i>复制
                      </Button>
                    </CopyToClipboard>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              {isAuthenticated ? (
                <Button 
                  variant="success" 
                  onClick={handleSave}
                  className="px-4"
                >
                  <i className="fas fa-save me-2"></i>保存此邮箱
                </Button>
              ) : (
                <Card.Text className="text-center">
                  <i className="fas fa-info-circle me-1"></i>
                  <strong>登录</strong>后可保存生成的邮箱
                </Card.Text>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EmailGenerator; 