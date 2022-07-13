import React, { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

import Header from './Header';
import Menu from './Menu';

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const [viewMobileMenu, setViewMobileMenu] = useState(false);

  const { width } = useViewportSize();

  useEffect(() => {
    if (width >= 768) {
      if (viewMobileMenu) {
        setViewMobileMenu(false)
      }
    }
  }, [width, setViewMobileMenu, viewMobileMenu])

  return (
    <div className='grow flex flex-row'>
      {/* desktop menu */}
      <div className='hidden sticky top-0 min-w-[320px] lg:min-w-[384px] h-screen md:flex flex-col border-r-[1px] border-base-200 overflow-y-auto'>
        <Menu viewMobileMenu={viewMobileMenu} setViewMobileMenu={setViewMobileMenu} />
      </div>
      <div className='grow flex flex-col'>
        <Header
          viewMenu={viewMobileMenu}
          setViewMenu={setViewMobileMenu}
        />
        {/* mobile menu */}
        {viewMobileMenu
          ?
          <div className='grow flex flex-col md:hidden'>
            <Menu viewMobileMenu={viewMobileMenu} setViewMobileMenu={setViewMobileMenu} />
          </div>
          : null
        }
        {/* page content */}
        <div className={`${viewMobileMenu ? 'hidden' : 'grow flex flex-col items-center'}`}>
          {children}
        </div>
      </div>
    </div>

  )
};

export default Layout;
