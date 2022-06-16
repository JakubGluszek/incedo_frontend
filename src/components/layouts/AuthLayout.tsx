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
      <main className='w-screen'>
        {children}
      </main>
      <footer className='w-screen h-16 flex flex-row items-center justify-center'>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </>
  )
}

export default AuthLayout;
