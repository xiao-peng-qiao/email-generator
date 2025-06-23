import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// 组件
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import EmailList from '../emails/EmailList';
import EmailForm from '../emails/EmailForm';
import EmailGenerator from '../emails/EmailGenerator';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <Container className="py-3">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/generator" component={EmailGenerator} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/emails" component={EmailList} />
        <PrivateRoute exact path="/emails/new" component={EmailForm} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

export default Routes; 