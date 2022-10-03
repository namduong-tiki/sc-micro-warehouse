import { Route } from '@/routes';
import React from 'react';
// import { AUTHORITY } from './constants/authority';
import messages from './locale';

const EntryComponent = React.lazy(() => import('./Entry'));

const routeConfig: Route = {
  path: '/withdrawal',
  name: 'withdrawal',
  component: EntryComponent,
  messages: messages,
  // authority: Object.values(AUTHORITY),
  authority: []
};

export default routeConfig;
