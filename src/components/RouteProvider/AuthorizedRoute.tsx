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
  permissions,
  path,
  authority,
  component,
  messages,
}) => {
  const Component = component;
  if (!isValidScope(permissions, authority)) {
    return <Forbidden />;
  }

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
