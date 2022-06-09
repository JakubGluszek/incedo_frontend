import { IGetToken, ISignIn, IUser } from "../../interfaces"
import { api } from "./api"

export const accountApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<IUser, ISignIn>({
      query: (credentials) => ({
        url: '/account/auth/signin',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    getToken: builder.mutation<any, IGetToken>({
      query: (credentials) => ({
        url: '/account/auth/token',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    getAccount: builder.query<IUser, any>({
      query: () => '/account'
    })
  })
})

export const {
  useSignInMutation,
  useGetTokenMutation,
  useGetAccountQuery
} = accountApi;
