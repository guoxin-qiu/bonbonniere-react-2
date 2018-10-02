import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import App from '../pages/App';
import FormLogin from '../pages/authentication/FormLogin';
import Swiches from '../components/common/Swiches';
import NotFound from '../components/common/404';

const BaseRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Swiches} />
      <Route path="/login" component={FormLogin} />
      <Route path="/app" component={App} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default BaseRouter;
