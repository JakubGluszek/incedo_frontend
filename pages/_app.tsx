import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <MantineProvider>
      <NotificationsProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </NotificationsProvider>
    </MantineProvider>
  )
};

export default MyApp;
