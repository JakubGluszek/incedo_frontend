import { createSlice } from '@reduxjs/toolkit';

import { AccountState } from '../../types';
import { RootState } from '../../app/store';
import { accountApi } from '../../app/services/account';

const initialState: AccountState = {
  user: null
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      accountApi.endpoints.fetchUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
    builder.addMatcher(
      accountApi.endpoints.signOut.matchFulfilled,
      state => {
        state = initialState
      }
    )
  }
})

export default accountSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.account.user;
