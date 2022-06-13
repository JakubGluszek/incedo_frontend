import React from 'react';
import Header from '../Header';


interface Props {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className=''>
        {children}
      </main>
      <footer className=''>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </>
  )
}

export default AuthLayout;
