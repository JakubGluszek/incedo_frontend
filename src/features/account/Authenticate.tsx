import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetAccountQuery } from '../../app/services/account';

import AuthLayout from '../../components/layouts/AuthLayout';
import PublicLayout from '../../components/layouts/PublicLayout';
import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';

// fetch current user, return content based on status
const Authenticate: React.FC = () => {
  const { isUninitialized, isFetching } = useGetAccountQuery({})
  const user = useAppSelector(selectCurrentUser)

  if (user) {
    return <AuthLayout><Outlet /></AuthLayout>
  }
  if (isUninitialized || isFetching) {
    return null
  }
  return <PublicLayout><Outlet /></PublicLayout>
}

export default Authenticate;
