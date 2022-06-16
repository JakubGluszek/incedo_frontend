import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Authenticate from './features/account/Authenticate';
import EmailCallback from './features/account/EmailCallback';
import AuthRequired from './features/account/AuthRequired';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import NotebooksPage from './pages/NotebooksPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Authenticate />}>

        {/* public & protected */}
        <Route index element={<HomePage />} />

        {/* protected */}
        <Route element={<AuthRequired />}>
          <Route path="notebooks" element={<NotebooksPage />} />
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
