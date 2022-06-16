import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import Header from '../Header';


interface Props {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header>
        <button className='btn-nav'
          aria-label='Expand Navbar'
        >
          <MdExpandMore size={32} />
        </button>
      </Header>
      <main className=''>
        {children}
      </main>
    </>
  )
}

export default AuthLayout;
