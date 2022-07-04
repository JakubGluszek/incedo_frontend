import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { api } from './services/api';
import accountReducer from '../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    account: accountReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
