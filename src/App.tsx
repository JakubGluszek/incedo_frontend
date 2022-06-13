import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Authenticate from './features/account/Authenticate';
import EmailCallback from './features/account/EmailCallback';
import AuthRequired from './features/account/AuthRequired';
import SignInPage from './pages/SignInPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Authenticate />}>

        {/* public & protected */}
        <Route index element={<h1>Home</h1>} />

        {/* protected */}
        <Route element={<AuthRequired />}>
          <Route element={<h1>Protected</h1>} />
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
