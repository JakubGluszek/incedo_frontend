import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';

// Redirect unauthenticated users
const AuthRequired: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)

  return (
    user
      ? <Outlet />
      : <Navigate to="/signin" />
  )
}

export default AuthRequired;
