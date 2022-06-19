import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';

// Redirect authenticated users
const AuthReject: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)

  return (
    user
      ? <Navigate to="/" />
      : <Outlet />
  )
}

export default AuthReject;
