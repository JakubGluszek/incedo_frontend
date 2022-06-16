import React from 'react';
import { ImBook, ImBooks } from 'react-icons/im';
import { MdKeyboardBackspace, MdAddBox, MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { AnimatedPage } from '../components/layouts/AnimatedPages';

const notebooks_data = [
  {
    id: 1,
    label: 'first notebook',
    about: null,
    rank: 0
  }
]

const NotebooksPage: React.FC = () => {
  const navigate = useNavigate();

  const notebooks = notebooks_data.map(n => (
    <div key={n.id} className='w-full h-fit flex flex-col p-2 gap-2 bg-white dark:bg-nord0 rounded-md shadow-md'>
      <div className='w-full h-fit flex flex-row items-center gap-2'>
        <ImBook size={24} />
        <span>{n.label}</span>
      </div>
    </div>
  ))

  return (
    <>
      <AnimatedPage>
        <div className='max-w-screen-sm w-full mx-auto h-fit flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
          <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
            <ImBooks size={32} />
            <span className='text-xl'>Notebooks</span>
          </div>
          <div className='w-full h-fit flex flex-col gap-4'>
            {notebooks}
          </div>
        </div>
      </AnimatedPage>
      <BottomNav>
        <button className='btn-nav' onClick={() => navigate('/')}>
          <MdKeyboardBackspace className='w-8 h-8 sm:w-10 sm:h-10' />
        </button>
        <button className='btn-nav'>
          <MdAddBox className='w-8 h-8 sm:w-10 sm:h-10' />
        </button>
        <button className='btn-nav'>
          <MdSearch className='w-8 h-8 sm:w-10 sm:h-10' />
        </button>
      </BottomNav>
    </>
  )
};

export default NotebooksPage;
