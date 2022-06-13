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
      <main className=''>
        {children}
      </main>
      <footer className=''>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </>
  )
}

export default PublicLayout;
