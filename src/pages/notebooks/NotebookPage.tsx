import React, { useState } from 'react';
import { MdAddBox, MdKeyboardBackspace, MdNote, MdSearch } from 'react-icons/md';
import { ImBook } from 'react-icons/im';
import BottomNav from '../../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { AnimatedPage } from '../../components/layouts/AnimatedPages';
import { TiArrowRight } from 'react-icons/ti';

const notebook = {
  id: 1,
  label: 'first notebook',
  about: 'lorem ipsum here',
  rank: 0
}

const NotebookPage: React.FC = () => {
  const [notes] = useState(
    new Array(10).fill(null).map((e, i) => ({
      id: i + 1,
      label: `${i} note ASD ASD ASasd`,
      body: 'lorem ipsum here lorem ipsum herelorem ipsum herelorem ipsum herelorem ipsum herelorem ipsum herelorem ipsum herelorem ipsum herelorem ipsum here',
      rank: i,
      notebook_id: 1
    }))
  )

  const navigate = useNavigate();

  const tryNavigate = (to: string) => {
    if (window.innerWidth <= 640) {
      navigate(to)
    }
  }

  const notesPreviews = notes.map(note => (
    <section key={note.id} className='w-full h-fit flex flex-col hover:cursor-pointer sm:hover:cursor-default p-2 gap-2 bg-white dark:bg-nord0 rounded-md hover:shadow-md'
      onClick={() => tryNavigate(`/notebooks/${note.notebook_id}/${note.id}`)}
    >
      <div className='w-fit h-fit flex flex-row items-center gap-2'>
        <MdNote size={32} />
        <span className='text-xl'>{note.label}</span>
      </div>
      <div className='w-full h-fit flex flex-row items-center gap-8'>
        <span className='text-nord3 text-sm'>{note.body.slice(0, 128)}...</span>
        <button className='hidden w-16 h-12 sm:flex items-center justify-center btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
          onClick={() => navigate(`/notebooks/${notebook.id}`)}
          aria-label='Navigate to "notebook" page'
        >
          <TiArrowRight size={24} />
        </button>
      </div>
    </section>
  ))

  return (
    <AnimatedPage>
      <div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <ImBook size={32} />
          <span className='text-2xl'>{notebook.label}</span>
        </div>
        <div className='w-full h-fit flex flex-col sm:grid sm:grid-cols-2 gap-4'>
          {notesPreviews}
        </div>
      </div>

      <BottomNav>
        <button className='btn-nav' onClick={() => navigate('/notebooks')}>
          <MdKeyboardBackspace className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
        <button className='btn-nav'>
					<MdAddBox className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>
        <button className='btn-nav'>
          <MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
      </BottomNav>
    </AnimatedPage>
  )
};

export default NotebookPage;
