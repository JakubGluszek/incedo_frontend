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
  MdPeople
} from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { GoCommentDiscussion } from 'react-icons/go';

const HomePage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)
  if (!user) return <IndexPage />;

  return (
    <div className='max-w-screen-sm w-full mx-auto h-fit flex flex-col py-8 px-6 gap-4'>

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
        <HalfCard>
          <MdAccountBox size={32} />
          <span>Profile</span>
        </HalfCard>
        <HalfCard>
          <MdSettings size={32} />
          <span>Settings</span>
        </HalfCard>
      </div>

      <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
        <MdExtension size={32} />
        <span className='text-xl'>Features</span>
      </div>

      <div className='w-full h-fit flex flex-row gap-4'>
        <HalfCard>
          <ImBooks size={32} />
          <span>Notebooks</span>
        </HalfCard>
        <HalfCard>
          <MdTextSnippet size={32} />
          <span>Snippets</span>
        </HalfCard>
      </div>
      <div className='w-full h-fit flex flex-row gap-4'>
        <HalfCard>
          <MdBookmarks size={32} />
          <span>Bookmarks</span>
        </HalfCard>
        <HalfCard>
          <MdOutlineReplay size={32} />
          <span>Sessions</span>
        </HalfCard>
      </div>
      <div className='w-full h-fit flex flex-row gap-4'>
        <HalfCard>
          <MdOutlineTimer size={32} />
          <span>Time since</span>
        </HalfCard>
        <HalfCard>
          <span className='text-center'>Personal Commandments</span>
        </HalfCard>
      </div>

      <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
        <MdPublic size={32} />
        <span className='text-xl'>Public</span>
      </div>

      <div className='w-full h-fit flex flex-row gap-4'>
        <HalfCard>
          <MdPeople size={32} />
          <span>People</span>
        </HalfCard>
        <HalfCard>
          <GoCommentDiscussion size={32} />
          <span>Discourse</span>
        </HalfCard>
      </div>

    </div>
  )
};

interface HalfCardProps {
  children: React.ReactNode
}

const HalfCard: React.FC<HalfCardProps> = ({ children }) => {
  return (
    <div className='w-1/2 h-16 flex flex-row p-4 items-center justify-center gap-4 bg-white dark:bg-nord0 shadow-sm rounded-md'>
      {children}
    </div>
  )
}

export default HomePage;
