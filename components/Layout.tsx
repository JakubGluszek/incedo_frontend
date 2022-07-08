import React from 'react';

import Header from './Header';
import Menu from './Menu';

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const [viewMobileSide, setViewMobileSide] = React.useState(false);

  return (
    <div className='w-full flex flex-row'>
      {/* menu content */}
      <Menu showMobile={viewMobileSide} setShowMobile={setViewMobileSide} />
      {/* main content */}
      <div className='grow flex flex-col'>
        <Header
          viewMenu={viewMobileSide}
          setViewMenu={setViewMobileSide}
        />
        {children}
      </div>
    </div>

  )
};

export default Layout;
