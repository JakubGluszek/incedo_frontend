import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

interface Props {
  children: React.ReactNode
}

export const AnimatedPage: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      className='w-full h-full flex flex-col'
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};
