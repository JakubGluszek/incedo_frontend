import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ThemeProvider initialTheme='light'>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>
);
