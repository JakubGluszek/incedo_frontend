import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode,
};

const ActionBar: React.FC<Props> = ({ children }) => {
  return (
    <motion.div className='z-40 fixed bottom-0 md:left-0 md:top-0 w-full md:w-20 h-16 md:h-screen bg-nord6 dark:bg-dark_bg md:bg-transparent md:dark:bg-transparent md:pt-20'
      initial={{ opacity: 0, bottom: -200 }}
      animate={{ opacity: 1, bottom: 0 }}
      exit={{ opacity: 0, bottom: -200 }}
      transition={{ duration: 0.4 }}
    >
      <div className='wrapper px-4 md:px-0 h-full md:my-auto flex flex-row md:flex-col-reverse items-center justify-between md:justify-evenly'>
        {children}
      </div>
    </motion.div>
  )
};

export default ActionBar;
