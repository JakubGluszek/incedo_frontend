import React from 'react';
import { useRouter } from 'next/router';
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

  if (!hasMounted) {
    // initial return
    content = (
      <div className="navbar-center">
        <Link href='/'>
          <span className="btn btn-ghost normal-case text-xl">Incedo</span>
        </Link>
      </div>
    )
  } else if (!user) {
    // there is no current user
    content = (
      <>
        <div className="navbar-start md:hidden">
          <Link href='/'>
            <span className="btn btn-ghost normal-case text-xl">Incedo</span>
          </Link>
        </div>
        <div className="navbar-end ml-auto">
          <Link href='/login'>
            <span className="btn btn-ghost normal-case text-xl">Login</span>
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
            <span className="btn btn-ghost normal-case text-xl">Incedo</span>
          </Link>
        </div>
        <div className="navbar-end ml-auto">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Image src={user?.avatar! ? user.avatar : '/dummy'} alt={user?.username ? user.username : 'dummy'} width={32} height={32} className='avatar rounded-full' />
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border-2 border-neutral">
              <li>
                <Link href='/settings'>
                  <div className='w-full h-fit flex flex-row items-center justify-evenly'>
                    <MdSettings size={20} />
                    <span>Settings</span>
                  </div>
                </Link>
              </li>
              <li>
                <button
                  className='btn btn-ghost'
                  onClick={() => handleSignOut()}
                >
                  <MdLogout size={20} />
                  <span>Sign out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="sticky top-0 navbar bg-base-100 max-w-screen-lg w-full mx-auto border-b-2 border-neutral">
      {content}
    </div>
  )
}

export default Header;