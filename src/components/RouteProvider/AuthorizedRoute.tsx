/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isValidScope } from '@/utils';
import React from 'react';
import { Route as RouteComponent } from 'react-router-dom';
import Forbidden from '@/components/Exceptions/Forbidden';
import { Message } from '@/locale';
import LanguageProvider from '../LanguageProvider';
import { isUndefined } from 'lodash';

interface AuthorizedRouteProps {
  permissions: string;
  component: React.ComponentType;
  path: string;
  authority: string[];
  messages?: Message;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  path,
  authority,
  permissions,
  component,
  messages,
}) => {
  const Component = component;
  console.log('permissions',permissions)
  console.log('authority',authority)

  // if (!isValidScope('permissions', authority)) {
  //   return <Forbidden />;
  // }

  if (isUndefined(messages)) {
    return (
      <RouteComponent path={path}>
        <Component />
      </RouteComponent>
    );
  }

  return (
    <RouteComponent path={path}>
      <LanguageProvider messages={messages}>
        <Component />
      </LanguageProvider>
    </RouteComponent>
  );
};

export default AuthorizedRoute;
