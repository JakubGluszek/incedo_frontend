import { api } from './api';

import { User } from '../../types';

interface Tokens {
  access_token: string,
  refresh_token: string
}

type Token = string
type Email = string

export const accountApi = api.injectEndpoints({
  endpoints: builder => ({
    // sign in to account by token from email
    signIn: builder.mutation<Tokens, Token>({
      query: token => ({
        url: '/account/auth/signin',
        method: 'POST',
        body: { token }
      })
    }),
    // send's email with sign in token
    fetchToken: builder.mutation<any, Email>({
      query: email => ({
        url: '/account/auth/token',
        method: 'POST',
        body: { email }
      })
      
    }),
    fetchUser: builder.query<User, any>({
      query: () => '/account/user'
    }),
    signOut: builder.mutation({
      query: () => ({
        url: '/account/auth',
        method: 'DELETE'
      })
    })
  })
})

export const {
  useSignInMutation,
  useFetchTokenMutation,
  useFetchUserQuery,
  useSignOutMutation
} = accountApi;
