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

const HomePage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate();
  if (!user) return <IndexPage />;

  const tryNavigate = (to: string) => {
    if (window.innerWidth <= 640) {
      navigate(to)
    }
  }

  return (
    <div className='max-w-screen-sm w-full mx-auto h-fit flex flex-col py-8 px-6 gap-4 text-sm sm:text-base'>

      <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
        <MdPerson size={32} />
        <span className='text-xl'>Account</span>
      </div>

      <div className='w-full flex flex-col gap-4 bg-white dark:bg-nord0 p-4 rounded-md shadow-sm'>
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
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-transform hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/profile')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdAccountBox size={32} />
            <span>Profile</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/profile')}
            aria-label='Navigate to "profile" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between  gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/settings')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdSettings size={32} />
            <span>Settings</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/settings')}
            aria-label='Navigate to "settings" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
      </div>

      <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
        <MdExtension size={32} />
        <span className='text-xl'>Features</span>
      </div>

      <div className='w-full h-fit flex flex-row gap-4'>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/notebooks')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <ImBooks size={32} />
            <span>Notebooks</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/notebooks')}
            aria-label='Navigate to "notebooks" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/snippets')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdTextSnippet size={32} />
            <span>Snippets</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/snippets')}
            aria-label='Navigate to "snippets" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
      </div>
      <div className='w-full h-fit flex flex-row gap-4'>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/bookmarks')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdBookmarks size={32} />
            <span>Bookmarks</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/bookmarks')}
            aria-label='Navigate to "bookmarks" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/sessions')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdOutlineReplay size={32} />
            <span>Sessions</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/sessions')}
            aria-label='Navigate to "sessions" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
      </div>
      <div className='w-full h-fit flex flex-row gap-4'>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/timers')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdOutlineTimer size={32} />
            <span>Timers</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/timers')}
            aria-label='Navigate to "timers" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/commandments')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <FaYinYang size={24} />
            <span className='text-center text-xs sm:text-base'>Commandments</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/commandments')}
            aria-label='Navigate to "commandments" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
      </div>

      <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
        <MdPublic size={32} />
        <span className='text-xl'>Public</span>
      </div>

      <div className='w-full h-fit flex flex-row gap-4'>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/people')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <MdPeople size={32} />
            <span>People</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/people')}
            aria-label='Navigate to "people" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
        <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-between gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md cursor-pointer sm:cursor-default transition-all hover:shadow-lg hover:scale-[101%]'
          onClick={() => tryNavigate('/discourse')}
        >
          <div className='flex flex-row w-full items-center justify-between sm:w-fit gap-4'>
            <GoCommentDiscussion size={32} />
            <span>Discourse</span>
          </div>
          <button className='hidden sm:block btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
            onClick={() => navigate('/discourse')}
            aria-label='Navigate to "discourse" page'
          >
            <TiArrowRight size={24} />
          </button>
        </div>
      </div>

    </div>
  )
};

export default HomePage;
