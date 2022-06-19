import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../components/Header';

import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';

// fetch current user, return content based on status
const Authenticate: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)

  let content;
  if (user) {
    content = (
      <button className='btn-nav'
        aria-label='Expand Navbar'
      >
        <MdExpandMore size={32} />
      </button>
    )
  } else {
    content = (
      <Link to='/signin' className='btn-nav'>
        <span>Sign in</span>
      </Link>
    )
  }

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header>
        {content}
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
