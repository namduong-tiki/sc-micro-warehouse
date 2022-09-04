import { Message } from '@/locale';
import React from 'react';
import WithdrawalRoute from '@/pages/Withdrawal';
import EmptyRoute from '@/pages/Empty';

export interface Route {
  path: string;
  component: React.ComponentType;
  authority: string[];
  name: string;
  messages?: Message;
}

// prettier-ignore
const ROUTES: Route[] = [
  WithdrawalRoute, 
  EmptyRoute
];

export default ROUTES;
