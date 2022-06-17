import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetAccountQuery } from '../../app/services/account';

import AuthLayout from '../../components/layouts/AuthLayout';
import PublicLayout from '../../components/layouts/PublicLayout';
import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';

// fetch current user, return content based on status
const Authenticate: React.FC = () => {
  const { isUninitialized } = useGetAccountQuery({})
  const user = useAppSelector(selectCurrentUser)

  let content;
  if (isUninitialized) {
    content = null
  } else if (user) {
    content = <AuthLayout><Outlet /></AuthLayout>
  } else {
    content = <PublicLayout><Outlet /></PublicLayout>
  }
  return content
}

export default Authenticate;
