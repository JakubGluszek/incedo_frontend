import React from 'react';
import { motion } from 'framer-motion';

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

interface Props {
  children: React.ReactNode
};

export const FadeInPage: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      className='grow flex flex-col'
      variants={fade}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};
