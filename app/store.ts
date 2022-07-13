import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { api } from './services/api';
import accountReducer from '../features/account/accountSlice';
import noteFoldersReducer from '../features/note_folders/noteFoldersSlice';
import notesReducer from '../features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    account: accountReducer,
    noteFolders: noteFoldersReducer,
    notes: notesReducer,
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
