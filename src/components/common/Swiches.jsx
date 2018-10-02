import React from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../utils/auth';

const Swiches = () =>
  auth.isAuthorized() ? <Redirect to="/app" /> : <Redirect to="/login" />;

export default Swiches;
