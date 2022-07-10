import '../styles/globals.css';
import { Provider } from 'react-redux';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AppPropsWithLayout } from '../types';
import { store } from '../app/store';
import { accountApi } from '../app/services/account';

store.dispatch(accountApi.endpoints.fetchUser.initiate({}))

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MantineProvider>
      <NotificationsProvider>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </NotificationsProvider>
    </MantineProvider>
  )
};

export default MyApp;
