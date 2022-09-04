import React from 'react';
import { authentication } from '@tikivn/sc-frontend-common';
import { Spin } from 'antd';

const { Authentication } = authentication;

function onLoginSuccess() {
  window.location.reload();
}

interface Props {
  children: React.ReactNode
}

const RouteGuard: React.FC<Props> = ({ children }) => {
  return (
    <Authentication
      loader={<Spin spinning />}
      shouldRequiredLogin
      poweredByQiankun={window.__POWERED_BY_QIANKUN__}
      loginBtnProps={{ onLoginSuccess }}
    >
      {children}
    </Authentication>
  );
};

export default RouteGuard;
