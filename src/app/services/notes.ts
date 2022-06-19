import { IFetchById } from '../../interfaces';
import { INote, INoteCreate } from '../../interfaces';
import { api } from './api';

export const notesApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchNoteById: builder.query<INote, IFetchById>({
      query: ({ id }) => `/notes/${id}`
    }),
    fetchNotes: builder.query<INote[], any>({
      query: () => '/notes'
    }),
    createNote: builder.mutation<INote, INoteCreate>({
      query: (note) => ({
        url: '/notes',
        method: 'POST',
        body: note
      })
    }),
    updateNote: builder.mutation<INote, INote>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'PUT',
        body: note
      })
    }),
    deleteNote: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useFetchNoteByIdQuery
} = notesApi;
