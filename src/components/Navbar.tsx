import React from 'react';

import { IUser } from '../interfaces';

interface Props {
  user: IUser
}

// Navbar for authenticated routes
const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <span>Navbar</span>
    </div>
  )
}

export default Navbar;
