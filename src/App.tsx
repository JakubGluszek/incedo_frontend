import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Authenticate from './features/account/Authenticate';
import EmailCallback from './features/account/EmailCallback';
import AuthRequired from './features/account/AuthRequired';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import PeoplesPage from './pages/PeoplePage';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import SnippetsPage from './pages/SnippetsPage';
import DiscoursePage from './pages/DiscoursePage';
import CommandmentsPage from './pages/CommandmentPage';
import TimersPage from './pages/TimersPage';
import SessionsPage from './pages/SessionsPage';
import BookmarksPage from './pages/BookmarksPage';
import NotebooksPage from './pages/notebooks/NotebooksPage';
import NotebookPage from './pages/notebooks/NotebookPage';
import NotePage from './pages/notebooks/NotePage';
import { useGetAccountQuery } from './app/services/account';

const App: React.FC = () => {
  const location = useLocation()
  const { isUninitialized, isLoading } = useGetAccountQuery({})

  if (isUninitialized || isLoading) {
    return <span>loading</span>
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Authenticate />}>

          {/* public & protected */}
          <Route index element={<HomePage />} />

          {/* protected */}
          <Route element={<AuthRequired />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={< SettingsPage />} />
            <Route path="notebooks" element={<NotebooksPage />} />
            <Route path="notebooks/:id" element={<NotebookPage />} />
            <Route path="notebooks/:id/:id" element={<NotePage />} />
            <Route path="snippets" element={<SnippetsPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="timers" element={<TimersPage />} />
            <Route path="commandments" element={<CommandmentsPage />} />
            <Route path="people" element={<PeoplesPage />} />
            <Route path="discourse" element={<DiscoursePage />} />
          </Route>

          {/* public */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="callback">
            <Route path="email" element={<EmailCallback />} />
          </Route>

        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
