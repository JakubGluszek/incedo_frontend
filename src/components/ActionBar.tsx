import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode,
};

const ActionBar: React.FC<Props> = ({ children }) => {
  return (
    <motion.div className='fixed bottom-0 w-screen h-16 md:h-20 bg-nord6 dark:bg-dark-bg'
      initial={{ opacity: 0, bottom: -200 }}
      animate={{ opacity: 1, bottom: 0 }}
      exit={{ opacity: 0, bottom: -200 }}
      transition={{ duration: 0.4 }}
    >
      <div className='max-w-screen-md w-full h-full mx-auto flex flex-row items-center justify-between px-6'>
        {children}
      </div>
    </motion.div>
  )
};

export default ActionBar;
