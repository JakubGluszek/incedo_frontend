import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';


interface Props {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header>
        {/* nav items here */}
      </Header>
      <main className='w-screen grow flex flex-col lg:flex-row max-w-screen-lg mx-auto p-6 gap-8'>
        <Sidebar />
        <div className='grow mx-auto w-full lg:w-auto'>
          {children}
        </div>
      </main>
      <footer className='flex flex-row items-center justify-center h-10'>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </div>
  )
}

export default AuthLayout;
