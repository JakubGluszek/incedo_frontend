import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdTextSnippet } from 'react-icons/md';
import MenuNotes from '../features/notes/NotesMenu';

interface Props {
  showMobile: boolean,
  setShowMobile: (showMobile: boolean) => void,
}

const Menu: React.FC<Props> = ({ showMobile, setShowMobile }) => {
  const router = useRouter();
  const pathname = router.pathname.split('/')[1]

  let menuPageSpecificContent;
  switch (pathname) {
    case 'notes':
      menuPageSpecificContent = (
        <>
          <div className='w-full h-12 hidden md:flex'>
            <Link href='/'>
              <span className='text-2xl btn btn-ghost normal-case tracking-widest m-auto'>Notes</span>
            </Link>
          </div>
          <MenuNotes />
        </>
      )
      break;
  }

  const menuContent = (
    <div className='sticky top-0 w-full h-screen flex flex-col p-4 py-2 border-r-[1px] border-base-200 gap-2 items-center justify-evenly'>
      {/* page specific content */}
      {menuPageSpecificContent
        ? menuPageSpecificContent
        : <div className='w-full h-12 hidden md:flex'>
          <Link href='/'>
            <span className='text-2xl btn btn-ghost normal-case tracking-widest m-auto'>Home</span>
          </Link>
        </div>
      }
      {/* website navigation */}
      <nav className='w-full h-fit flex flex-col items-center gap-1'>
        {pathname !== 'notes' &&
          <Link href='/notes'>
            <div
              className='flex flex-row gap-1 items-center link'
              onClick={() => setShowMobile(false)}
            >
              <MdTextSnippet />
              <span>Notes</span>
            </div>
          </Link>
        }
        <Link href='/'>
          <div
            className='flex flex-row gap-1 items-center link'
            onClick={() => setShowMobile(false)}
          >
            <span className='link'>snippets</span>
          </div>
        </Link>
        <Link href='/'>
          <div
            className='flex flex-row gap-1 items-center link'
            onClick={() => setShowMobile(false)}
          >
            <span className='link'>sessions</span>
          </div>
        </Link>
        <Link href='/'>
          <div
            className='flex flex-row gap-1 items-center link'
            onClick={() => setShowMobile(false)}
          >
            <span className='link'>principles</span>
          </div>
        </Link>
        <Link href='/'>
          <div
            className='flex flex-row gap-1 items-center link'
            onClick={() => setShowMobile(false)}
          >
            <span className='link'>predictions</span>
          </div>
        </Link>
      </nav >
    </div>
  )

  return (
    <>
      {/* large screen menu */}
      <div className='z-50 w-full md:max-w-xs lg:max-w-sm hidden md:flex flex-col'>
        {menuContent}
      </div>
      {/* mobile screen menu */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            className='z-40 fixed bg-base-100 h-screen w-full py-16 border-r-[1px] border-base-200 md:hidden'
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
