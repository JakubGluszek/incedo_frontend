import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { MdNote } from 'react-icons/md';

interface Props {
  showMobile: boolean,
  setShowMobile: (showMobile: boolean) => void,
}

const Menu: React.FC<Props> = ({ showMobile, setShowMobile }) => {

  const actions = (
    <div className='w-full h-fit flex flex-col gap-1 items-center'>
      <span className='text-xl'>Notes</span>
    </div>
  )

  const content = (
    <div className='sticky top-0 w-full h-screen flex flex-col p-4 py-2 border-r-2 border-neutral gap-2 items-center justify-evenly'>
      {/* website logo */}
      <div className='w-full h-12 hidden md:flex'>
        <Link href='/'>
          <span className='text-xl btn btn-ghost normal-case m-auto'>Incedo</span>
        </Link>
      </div>
      {/* page specific actions */}
      {actions}
      {/* website navigation */}
      <nav className='w-full h-fit flex flex-col items-center gap-1'>
        <Link href='/notes'>
          <div
            className='flex flex-row gap-1 items-center link link-hover'
            onClick={() => setShowMobile(false)}
          >
            <MdNote />
            <span>Notes</span>
          </div>
        </Link>
        <Link href='/notes'>
          <div
            className='flex flex-row gap-1 items-center link link-hover'
            onClick={() => setShowMobile(false)}
          >
            <MdNote />
            <span>other</span>
          </div>
        </Link>
        <Link href='/notes'>
          <div
            className='flex flex-row gap-1 items-center link link-hover'
            onClick={() => setShowMobile(false)}
          >
            <MdNote />
            <span>other</span>
          </div>
        </Link>
      </nav>
    </div>
  )

  return (
    <>
      {/* large screen menu */}
      <div className='w-full md:max-w-xs lg:max-w-sm hidden md:flex flex-col'>
        {content}
      </div>
      {/* mobile screen menu */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            className='fixed bg-base-100 h-screen w-full py-16 border-r-2 border-neutral md:hidden'
            initial={{ translateX: -window.innerWidth }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ translateX: -window.innerWidth }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
};

export default Menu;
