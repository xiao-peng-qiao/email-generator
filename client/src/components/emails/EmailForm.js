import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import EmailContext from '../../context/email/emailContext';
import AlertContext from '../../context/alert/alertContext';

const EmailForm = () => {
  const emailContext = useContext(EmailContext);
  const alertContext = useContext(AlertContext);
  const history = useHistory();

  const { addEmail, current, clearCurrent, updateEmail } = emailContext;
  const { setAlert } = alertContext;

  const [provider, setProvider] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (current !== null) {
      setProvider(current.provider);
      setDescription(current.description || '');
    } else {
      setProvider('');
      setDescription('');
    }
  }, [current]);

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addEmail({
        provider,
        description
      });
      setAlert('邮箱已创建', 'success');
    } else {
      updateEmail({
        _id: current._id,
        provider,
        description
      });
      setAlert('邮箱已更新', 'success');
    }

    clearAll();
    history.push('/emails');
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Container className="py-3">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">
            {current ? '编辑邮箱' : '创建新邮箱'}
          </h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>邮箱提供商</Form.Label>
              <Form.Select
                value={provider}
                onChange={e => setProvider(e.target.value)}
                required
              >
                <option value="" disabled>
                  选择提供商
                </option>
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
                <option value="yahoo">Yahoo</option>
                <option value="qq">QQ邮箱</option>
                <option value="163">163邮箱</option>
                <option value="126">126邮箱</option>
                <option value="hotmail">Hotmail</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>描述（可选）</Form.Label>
              <Form.Control
                type="text"
                placeholder="描述此邮箱的用途"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {current ? '更新邮箱' : '创建邮箱'}
              </Button>
              {current && (
                <Button variant="light" onClick={clearAll}>
                  取消
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailForm; 