import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { accountApi } from './app/services/account';

const container = document.getElementById('root')!;
const root = createRoot(container);

store.dispatch(accountApi.endpoints.getAccount.initiate({}))

root.render(
  <ThemeProvider>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>
);
