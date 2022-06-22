import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { MdExpandMore } from 'react-icons/md';

import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';
import Header from '../../components/Header';

const Authenticate: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header>
        {user
          ?
          <button className='btn-nav' aria-label='Expand Navbar'>
            <MdExpandMore size={32} />
          </button>
          :
          <Link to='/signin' className='btn-nav'>
            <span>Sign in</span>
          </Link>
        }
      </Header>

      <main className='grow flex flex-col'>
        <Outlet />
      </main>

      {user
        ? null
        :
        <footer className='w-full flex flex-col items-center justify-center'>
          <span>© 2022 Incedo, Inc.</span>
          <p className='opacity-40 italic'>**Under construction**</p>
        </footer>
      }
    </div>
  )
}

export default Authenticate;
