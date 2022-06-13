import React from 'react';
import { Routes, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import SignInPage from './pages/SignInPage';

import Authenticate from './features/account/Authenticate';
import EmailCallback from './features/account/EmailCallback';
import AuthRequired from './features/account/AuthRequired';
import TodayPage from './pages/TodayPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Authenticate />}>

        {/* public & protected */}
        <Route index element={<IndexPage />} />

        {/* protected */}
        <Route element={<AuthRequired />}>
          <Route path="today" element={<TodayPage />} />
        </Route>

        {/* public */}
        <Route path="signin" element={<SignInPage />} />
        <Route path="callback">
          <Route path="email" element={<EmailCallback />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
