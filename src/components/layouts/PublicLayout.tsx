import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

interface Props {
  children: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header>
        <Link to='/signin' className='btn-nav'>
          <span>Sign in</span>
        </Link>
      </Header>
      <main className='grow overflow-x-hidden'>
        {children}
      </main>
      <footer className='w-full flex flex-col items-center justify-center'>
        <span>© 2022 Incedo, Inc.</span>
        <p className='opacity-40 italic'>**Under construction**</p>
      </footer>
    </>
  )
}

export default PublicLayout;
