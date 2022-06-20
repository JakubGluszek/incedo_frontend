import { createSlice } from '@reduxjs/toolkit';
import { accountApi } from '../../app/services/account';
import { RootState } from '../../app/store';
import { IStateAccount } from '../../interfaces';

const initialState: IStateAccount = {
  user: null
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => [
    builder.addMatcher(
      accountApi.endpoints.fetchAccount.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    ),
    builder.addMatcher(
      accountApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    ),
  ]
})

export default accountSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.account.user;
