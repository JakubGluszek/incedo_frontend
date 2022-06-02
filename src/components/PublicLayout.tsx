import React from 'react';
import { Outlet } from 'react-router-dom';

// Layout for simple public pages like: signin, email callback..
const PublicLayout: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <header className='w-full h-20 flex flex-row items-center justify-center'>
        <h1>Incedo</h1>
      </header>
      <div className='w-full grow flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default PublicLayout;
