import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { MdTextSnippet } from 'react-icons/md';

import NotesMenu from '../features/notes/NotesMenu';

interface Props {
  showMobile: boolean,
  setShowMobile: (showMobile: boolean) => void,
}

const Menu: React.FC<Props> = ({ showMobile, setShowMobile }) => {
  const router = useRouter();
  const pathname = router.pathname.split('/')

  let menuPageSpecificContent;
  switch (pathname[1]) {
    case 'notes':
      menuPageSpecificContent = <NotesMenu />
      break;
  }

  const menuContent = (
    <div className='grow md:w-64 lg:w-80 flex flex-col gap-4 items-center justify-evenly'>
      {/* menu header */}
      <Link href='/'>
        <a className='md:flex btn btn-ghost normal-case text-xl text-accent'>Incedo</a>
      </Link>
      {/* content based on path */}
      {menuPageSpecificContent}
      {/* website navigation */}
      <nav className='w-full h-fit flex flex-col items-center gap-1'>
        {pathname[1] !== 'notes' &&
          <Link href='/notes'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
              onClick={() => setShowMobile(!showMobile)}
            >
              <MdTextSnippet />
              <span>Notes</span>
            </a>
          </Link>
        }
        {pathname[1] !== 'snippets' &&
          <Link href='/snippets'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
              onClick={() => setShowMobile(!showMobile)}
            >
              snippets
            </a>
          </Link>
        }
        {pathname[1] !== 'sessions' &&
          <Link href='/sessions'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
              onClick={() => setShowMobile(!showMobile)}
            >
              sessions
            </a>
          </Link>
        }
        {pathname[1] !== 'principles' &&
          <Link href='/principles'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
              onClick={() => setShowMobile(!showMobile)}
            >
              principles
            </a>
          </Link>
        }
        {pathname[1] !== 'predictions' &&
          <Link href='/predictions'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
              onClick={() => setShowMobile(!showMobile)}
            >
              predictions
            </a>
          </Link>
        }
      </nav >
      {/* menu footer */}
      <div className='w-full flex flex-row items-center justify-evenly'>
        <Link href='/support'>
          <a
            className='link link-hover'
            onClick={() => setShowMobile(!showMobile)}
          >support</a>
        </Link>
        <Link href='/report_bugs'>
          <a
            className='link link-hover'
            onClick={() => setShowMobile(!showMobile)}
          >report bugs</a>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* large screen menu */}
      <div className='sticky top-0 z-40 h-screen hidden md:flex flex-col p-4 py-2 border-r-[1px] border-base-200'>
        {menuContent}
      </div>
      {/* mobile screen menu */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            className='z-40 w-full min-h-screen flex md:hidden flex-col bg-base-100 border-r-[1px] border-base-200'
            initial={{ translateX: -window.innerWidth }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ translateX: -window.innerWidth }}
            transition={{ duration: 0.3 }}
          >
            {menuContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
};

export default Menu;
