import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import IndexPage from './components/IndexPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
      </Route>
    </Routes>
  );
}

export default App;
