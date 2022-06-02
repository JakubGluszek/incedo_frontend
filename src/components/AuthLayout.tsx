import React from 'react';

import { IUser } from '../interfaces'
import Navbar from './Navbar';

interface Props {
  user: IUser,
  children: React.ReactNode
}

// Layout for all authenticated routes
const AuthLayout: React.FC<Props> = ({ user, children }) => {
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  )
}

export default AuthLayout;
