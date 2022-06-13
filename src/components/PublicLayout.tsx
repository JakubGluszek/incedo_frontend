import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

interface Props {
  children: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header>
        <Link to='/signin' className='btn-nav'>
          <span>Sign in</span>
        </Link>
      </Header>
      <main className='grow flex flex-col'>
        {children}
      </main>
      <footer className='flex flex-row items-center justify-center h-10'>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </div>
  )
}

export default PublicLayout;
