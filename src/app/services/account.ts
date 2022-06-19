import { IFetchToken, ILogin, IUser } from '../../interfaces';
import { api } from './api';

export const accountApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IUser, ILogin>({
      query: (credentials) => ({
        url: '/account/auth/signin',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    fetchToken: builder.mutation<any, IFetchToken>({
      query: (credentials) => ({
        url: '/account/auth/token',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    fetchAccount: builder.query<IUser, any>({
      query: () => '/account/user'
    })
  })
})

export const {
  useLoginMutation,
  useFetchTokenMutation,
  useFetchAccountQuery
} = accountApi;
