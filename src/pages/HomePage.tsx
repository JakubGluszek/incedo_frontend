import React from 'react';
import { useAppSelector } from '../hooks/store';
import { selectCurrentUser } from '../features/account/accountSlice';
import IndexPage from './IndexPage';
import {
  MdPerson,
  MdExtension,
  MdPublic,
  MdAccountBox,
  MdSettings,
  MdTextSnippet,
  MdBookmarks,
  MdOutlineReplay,
  MdOutlineTimer,
  MdPeople,
} from 'react-icons/md';
import { FaYinYang } from 'react-icons/fa';
import { TiArrowRight } from 'react-icons/ti';
import { ImBooks } from 'react-icons/im';
import { GoCommentDiscussion } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { FadeInPage } from '../components/AnimatedPage';
import { tryNavigate } from '../utils';

const HomePage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (!user) return <IndexPage />;

  const section = (title: string, to: string, icon: React.ReactElement) => (
    <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 rounded-md cursor-pointer sm:cursor-default hover:shadow-md'
      onClick={() => tryNavigate(navigate, to)}
    >
      <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
        {icon}
        <span>{title}</span>
      </div>
      <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
        onClick={() => navigate(to)}
        aria-label='Navigate to "people" page'
      >
        <TiArrowRight size={24} />
      </button>
    </div>
  )

  return (
    <FadeInPage>
      <div className='max-w-screen-sm w-full mx-auto h-fit flex flex-col py-8 px-6 gap-4 text-sm sm:text-base'>

        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <MdPerson size={32} />
          <span className='text-2xl'>Account</span>
        </div>

        {/* Account preview */}
        <div className='w-full flex flex-col gap-4 bg-white dark:bg-nord0 p-4 rounded-md transition-shadow duration-300 hover:shadow-md'>
          <div className='w-full h-16 flex flex-row gap-2 items-center'>
            <img className='rounded-md'
              src={user.avatar}
              alt={user.username}
              width={64}
              height={64}
            />
            <span className='font-medium text-lg'>{user.username}</span>
          </div>
          <p>life is good</p>
        </div>

        <div className='w-full h-fit flex flex-row gap-4'>
          {section('Profile', '/people', <MdAccountBox size={32} />)}
          {section('Settings', '/settings', <MdSettings size={32} />)}
        </div>

        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <MdExtension size={32} />
          <span className='text-2xl'>Features</span>
        </div>

        <div className='w-full h-fit flex flex-row gap-4'>
          {section('Notebooks', '/notebooks', <ImBooks size={32} />)}
          {section('Snippets', '/snippets', <MdTextSnippet size={32} />)}
        </div>
        <div className='w-full h-fit flex flex-row gap-4'>
          {section('Bookmarks', '/bookmarks', <MdBookmarks size={32} />)}
          {section('Sessions', '/sessions', <MdOutlineReplay size={32} />)}
        </div>
        <div className='w-full h-fit flex flex-row gap-4'>
          {section('Timers', '/timers', <MdOutlineTimer size={32} />)}
          {section('Principles', '/principles', <FaYinYang size={32} />)}
        </div>

        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <MdPublic size={32} />
          <span className='text-2xl'>Public</span>
        </div>

        <div className='w-full h-fit flex flex-row gap-4'>
          {section('People', '/people', <MdPeople size={32} />)}
          {section('Discourse', '/discourse', <GoCommentDiscussion size={32} />)}
        </div>
      </div>
    </FadeInPage>
  )
};

export default HomePage;
