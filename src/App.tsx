import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Authenticate from './features/account/Authenticate';
import EmailCallback from './features/account/EmailCallback';
import AuthRequired from './features/account/AuthRequired';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import NotebooksPage from './pages/NotebooksPage';
import PeoplesPage from './pages/PeoplePage';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import SnippetsPage from './pages/SnippetsPage';
import DiscoursePage from './pages/DiscoursePage';
import CommandmentsPage from './pages/CommandmentPage';
import TimersPage from './pages/TimersPage';
import SessionsPage from './pages/SessionsPage';
import BookmarksPage from './pages/BookmarksPage';

const App: React.FC = () => {
  const location = useLocation()

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
