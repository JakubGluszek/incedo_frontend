import React, { useEffect, useRef } from 'react';

interface Props {
  display: boolean
};

const NotebookCreate: React.FC<Props> = ({ display }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  return (
    <div ref={ref} className='w-full h-fit flex flex-col gap-2 bg-white dark:bg-nord0 p-4 sm:p-8 rounded-md'>
      <h3>Create Notebook</h3>
      <label htmlFor='label'>Label</label>
      <input id='label' type='text' />
      <label htmlFor='about'>About</label>
      <textarea id='about' className='' />
    </div>
  )
};

export default NotebookCreate;
