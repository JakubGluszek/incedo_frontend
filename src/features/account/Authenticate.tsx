import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetAccountQuery } from '../../app/services/account';
import AuthLayout from '../../components/AuthLayout';

// fetch current user, return content based on status
const Authenticate: React.FC = () => {
  const { data: user, isLoading, isSuccess } = useGetAccountQuery({})

  let content;

  if (isLoading) {
    content = <h1>Fetching account</h1>
  } else {
    if (isSuccess) {
      // AuthLayout is here to ensure consistency between
      // an authorized index page & other protected routes
      content = <AuthLayout user={user}><Outlet /></AuthLayout>
    } else {
      content = <Outlet />
    }
  }

  return content
}

export default Authenticate;
