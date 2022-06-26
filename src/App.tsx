import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader } from '@mantine/core';

import { useFetchAccountQuery } from './app/services/account';

import Authenticate from './features/account/Authenticate';
import EmailCallback from './features/account/EmailCallback';
import AuthRequired from './features/account/AuthRequired';
import AuthReject from './features/account/AuthReject';

import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import SnippetsPage from './pages/SnippetsPage';
import PrinciplesPage from './pages/PrinciplesPage';
import TimersPage from './pages/TimersPage';
import SessionsPage from './pages/SessionsPage';
import BookmarksPage from './pages/BookmarksPage';
import PeoplesPage from './pages/PeoplePage';
import DiscoursePage from './pages/DiscoursePage';
import NotebooksPage from './pages/NotebooksPage';
import NotebookPage from './pages/NotebookPage';
import NotePage from './pages/NotePage';

// fetch user, then render components based on path & user
const App: React.FC = () => {
  const location = useLocation();
  const { isUninitialized, isLoading } = useFetchAccountQuery({});

  if (isUninitialized || isLoading) {
    return (
      <div className='fixed w-full h-full flex items-center justify-center'>
        <Loader color='white' size="xl" variant="bars" />
      </div>
    )
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Authenticate />}>

          {/* public & protected */}
          <Route index element={<HomePage />} />

          {/* protected */}
          <Route element={<AuthRequired />}>
            <Route path='profile' element={<ProfilePage />} />
            <Route path='settings' element={< SettingsPage />} />
            <Route path='notebooks' element={<NotebooksPage />} />
            <Route path='notebooks/:id' element={<NotebookPage />} />
            <Route path='notebooks/:id/:id' element={<NotePage />} />
            <Route path='snippets' element={<SnippetsPage />} />
            <Route path='bookmarks' element={<BookmarksPage />} />
            <Route path='sessions' element={<SessionsPage />} />
            <Route path='timers' element={<TimersPage />} />
            <Route path='principles' element={<PrinciplesPage />} />
            <Route path='people' element={<PeoplesPage />} />
            <Route path='discourse' element={<DiscoursePage />} />
          </Route>

          {/* public */}
          <Route element={<AuthReject />}>
            <Route path='signin' element={<SignInPage />} />
            <Route path='callback'>
              <Route path='email' element={<EmailCallback />} />
            </Route>
          </Route>

        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
