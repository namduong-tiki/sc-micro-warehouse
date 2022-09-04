import React, { ReactElement, useEffect } from 'react';
import { useCurrentUser } from '@tikivn/sc-frontend-common';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { saveUserDetail } from '@/slices/user';
import { UserDetail } from './interface';

interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const data: UserDetail = useCurrentUser({
    currentSeller: {
      query: {
        include: 'permissions,roles,stores',
      },
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(data.user)) {
      // why add a function to response object T.T
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { checkTikiTrading, ...user } = data.user;
      dispatch(saveUserDetail({ user, seller: data.seller }));
    }
  }, [data.seller, data.user, dispatch]);

  return React.cloneElement(children as ReactElement, {
    data: data as UserDetail,
  });
};

export default UserProvider;
