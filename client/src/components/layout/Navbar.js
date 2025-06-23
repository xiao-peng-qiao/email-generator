import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Nav.Link as={Link} to="/dashboard">
        <i className="fas fa-user" /> 仪表板
      </Nav.Link>
      <Nav.Link as={Link} to="/emails">
        <i className="fas fa-envelope" /> 我的邮箱
      </Nav.Link>
      <Nav.Link onClick={onLogout} href="#!">
        <i className="fas fa-sign-out-alt" /> 退出
      </Nav.Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav.Link as={Link} to="/generator">
        <i className="fas fa-envelope" /> 生成邮箱
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        <i className="fas fa-user-plus" /> 注册
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <i className="fas fa-sign-in-alt" /> 登录
      </Nav.Link>
    </Fragment>
  );

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <i className="fas fa-envelope-open-text" /> 邮箱生成器
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 