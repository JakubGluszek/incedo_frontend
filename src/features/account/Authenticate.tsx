import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';
import Header from '../../components/Header';

const Authenticate: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header>
        {!user &&
          <Link to='/signin' className='btn'>
            <span>Sign in</span>
          </Link>
        }
      </Header>
      <Outlet />
      {!user &&
        <footer className='w-full flex flex-col items-center justify-center'>
          <span>© 2022 Incedo, Inc.</span>
          <p className='opacity-40 italic'>**Under construction**</p>
        </footer>
      }
    </div>
  )
}

export default Authenticate;
