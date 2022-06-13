import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexSidebar from './sidebars/IndexSidebar';
import TodaySidebar from './sidebars/TodaySidebar';

const Sidebar: React.FC = () => {
  return (
    <>
      <div className='hidden lg:block w-48'>{/* spacing because sidebar is fixed */}</div>
      <div className='hidden lg:block w-48 fixed p-2'>
        <Routes>
          <Route path='/' element={<IndexSidebar />} />
          <Route path='/today' element={<TodaySidebar />} />
        </Routes>
      </div>
    </>
  )
};

export default Sidebar;
