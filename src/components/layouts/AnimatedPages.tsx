import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
};

interface Props {
  children: React.ReactNode
}

export const AnimatedPage: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
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

