import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';

import { MdClose, MdLogout, MdSettings } from 'react-icons/md';

import { useAppSelector } from '../hooks/store';
import { useSignOutMutation } from '../app/services/account';
import { selectCurrentUser } from '../features/account/accountSlice';

interface Props {
  viewMenu: boolean,
  setViewMenu: (view: boolean) => void,
}

const Header: React.FC<Props> = ({ viewMenu, setViewMenu }) => {
  const user = useAppSelector(selectCurrentUser);

  const [signOut] = useSignOutMutation();
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSignOut = () => {
    signOut({})
    showNotification({
      title: 'Success',
      message: 'Logged out',
      color: 'green',
      classNames: {
        root: 'bg-base-100 border-base-200 text-base-content',
        title: 'text-base-content'
      }
    })
  }

  let content;

  if (!hasMounted || !user) {
    // there is no current user
    content = (
      <>
        <div className="navbar-start md:hidden">
          <Link href='/'>
            <a className="btn btn-ghost normal-case text-xl">Incedo</a>
          </Link>
        </div>
        <div className="navbar-end ml-auto">
          <Link href='/login'>
            <a className="btn btn-ghost normal-case text-xl">Login</a>
          </Link>
        </div>
      </>
    )
  } else {
    // current user is authenticated
    content = (
      <>
        <div className="navbar-start md:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle swap swap-rotate"
          >
            <input type='checkbox' checked={viewMenu} onChange={() => setViewMenu(!viewMenu)} />
            <svg className="h-5 w-5 swap-off" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            <MdClose className='swap-on' size={20} />
          </label>
        </div>
        <div className="navbar-center md:hidden">
          <Link href='/'>
            <a className="btn btn-ghost normal-case text-xl">Incedo</a>
          </Link>
        </div>
        <div className="navbar-end ml-auto">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Image src={user.avatar} alt={user.username} width={32} height={32} className='avatar rounded-full' />
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border-2 border-base-200">
              <li>
                <Link href='/settings'>
                  <a className='w-full h-fit flex flex-row items-center justify-evenly'>
                    <MdSettings size={20} />
                    <span>Settings</span>
                  </a>
                </Link>
              </li>
              <li>
                <div
                  className='w-full h-fit flex flex-row items-center justify-evenly btn btn-ghost hover:btn-primary'
                  onClick={() => handleSignOut()}
                >
                  <MdLogout size={20} />
                  <span>Sign out</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="z-50 sticky top-0 navbar bg-base-100 w-full mx-auto border-b-[1px] border-base-200">
      {content}
    </div>
  )
}

export default Header;
