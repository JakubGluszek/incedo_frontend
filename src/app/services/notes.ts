import { IFetchById } from "../../interfaces";
import { INote } from '../../features/notes/interfaces';
import { api } from "./api"

export const notesApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchNoteById: builder.query<INote, IFetchById>({
      query: ({ id }) => `/notes/${id}`
    })
    // login: builder.mutation<IUser, ILogin>({
    //   query: (credentials) => ({
    //     url: '/account/auth/signin',
    //     method: 'POST',
    //     body: { ...credentials }
    //   })
    // }),
    // fetchToken: builder.mutation<any, IFetchToken>({
    //   query: (credentials) => ({
    //     url: '/account/auth/token',
    //     method: 'POST',
    //     body: { ...credentials }
    //   })
    // }),
    // fetchAccount: builder.query<IUser, any>({
    //   query: () => '/account/user'
    // })
  })
})

export const {
  useFetchNoteByIdQuery
} = notesApi;
