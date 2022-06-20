import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode,
};

const ActionBar: React.FC<Props> = ({ children }) => {
  return (
    <motion.div className='sticky w-full h-16 flex flex-row items-center justify-evenly bg-nord6 dark:bg-dark-bg'
      initial={{ opacity: 0, bottom: -200 }}
      animate={{ opacity: 1, bottom: 0 }}
      exit={{ opacity: 0, bottom: -200 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
};

export default ActionBar;
