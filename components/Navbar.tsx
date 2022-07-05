import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { User } from '../types';

interface Props {
  user: User | undefined
}

const Navbar: React.FC<Props> = ({ user }) => {

  if (!user) {
    return (
      <nav className="sticky top-0 navbar bg-base-100 max-w-screen-lg mx-auto">
        <div className="navbar-start">
          <Link href='/'>
            <span className="btn btn-ghost normal-case text-xl">Incedo</span>
          </Link>
        </div>
        <div className="navbar-end">
          <Link href='/login'>
            <span className="btn btn-ghost normal-case text-xl md:hidden">Login</span>
          </Link>
        </div>
      </nav>
    )
  }
  return (
    <nav className="sticky top-0 navbar bg-base-100 max-w-screen-lg mx-auto">
      <div className="navbar-start md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
      </div>
      <div className="navbar-center md:navbar-start">
        <Link href='/'>
          <span className="btn btn-ghost normal-case text-xl">Incedo</span>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Image src={user?.avatar! ? user.avatar: '/dummy'} alt={user?.username ? user.username: 'dummy'} width={32} height={32} className='avatar rounded-full' />
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Settings</a></li>
            <li><a>Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
