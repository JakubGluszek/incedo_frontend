import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import dailyNoteReducer from '../features/dailyNote/dailyNoteSlice';

import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    account: accountReducer,
    dailyNote: dailyNoteReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
