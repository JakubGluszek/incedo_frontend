import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode
}

const BottomNav: React.FC<Props> = ({ children }) => {
  return (
    <motion.div className='w-full fixed bottom-0 h-14 sm:h-16 z-10'
      initial={{opacity: 0, bottom: -200}}
      animate={{opacity: 1, bottom: 0}}
      exit={{opacity: 0, bottom: -200}}
      transition={{ duration: 0.5 }}
    >
      <div className='max-w-screen-sm w-full h-full mx-auto px-6 py-2 flex flex-row items-center justify-between bg-nord6 dark:bg-dark-bg text-nord7'>
        {children}
      </div>
    </motion.div>
  )
};

export default BottomNav;
