import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineCancel } from 'react-icons/md';

interface Props {
  display: boolean,
  setSearch: (search: string | null) => void,
  search: string | null,
};

const NotebooksSearch: React.FC<Props> = ({ display, setSearch, search }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!display) {
      setSearch(null)
    }
  }, [display])

  return (
    <AnimatePresence>
      {display && <motion.div
        initial={{ opacity: 0, y: -64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='w-full h-16 flex flex-row items-center gap-4'
      >
        <input
          ref={inputRef}
          className='w-full'
          type='text'
          autoFocus
          onChange={e => setSearch(e.currentTarget.value)}
        />
        {search &&
          <button
            className='btn-action'
            onClick={() => setSearch(null)}
          >
            <MdOutlineCancel />
          </button>
        }
      </motion.div>}
    </AnimatePresence>
  )
};

export default NotebooksSearch;
