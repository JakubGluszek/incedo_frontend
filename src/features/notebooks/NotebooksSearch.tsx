import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  display: boolean,
  setSearch: (search: string) => void
};

const NotebooksSearch: React.FC<Props> = ({ display, setSearch }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (display && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [display])

  return (
    <AnimatePresence>
      {display && <motion.div
        initial={{ opacity: 0, y: -64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='w-full h-16 mx-auto flex flex-row items-center gap-4 p-2'
        ref={containerRef}
      >
        <input
          className='w-full'
          type='text'
          autoFocus
          onChange={e => setSearch(e.currentTarget.value)}
        />
      </motion.div>}
    </AnimatePresence>
  )
};

export default NotebooksSearch;
