import React from 'react';
import { Redirect } from 'react-router-dom';
import * as AppConstant from '../../constants/appConstant';

const Swiches = () =>
  localStorage.getItem(AppConstant.USER_INFO_STORAGE_KEY) === null ? (
    <Redirect to="/login" />
  ) : (
    <Redirect to="/app" />
  );

export default Swiches;
