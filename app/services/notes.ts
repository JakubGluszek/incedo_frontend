import { api } from './api';
import { Note, RemoveMulti } from '../../types';

interface NoteCreate {
  label: string,
}

interface NoteUpdate {
  id: number,
  label?: string,
  body?: string
}

export const notesApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchNotes: builder.query<Note[], any>({
      query: () => ({
        url: '/notes',
        method: 'GET'
      })
    }),
    fetchNoteById: builder.query<Note, number | string>({
      query: id => ({
        url: `/notes/${id}`,
        method: 'GET'
      })
    }),
    createNote: builder.mutation<Note, NoteCreate>({
      query: note => ({
        url: '/notes',
        method: 'POST',
        body: note
      })
    }),
    updateNote: builder.mutation<Note, NoteUpdate>({
      query: update => ({
        url: `/notes/${update.id}`,
        method: 'PUT',
        body: update
      })
    }),
    removeNote: builder.mutation<any, number>({
      query: id => ({
        url: `/notes/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (r, meta, arg) => arg
    }),
    removeMultiNotes: builder.mutation<any, RemoveMulti>({
      query: payload => ({
        url: '/notes',
        method: 'DELETE',
        body: payload
      }),
      transformResponse: (r, meta, arg) => arg.notes_ids
    }),
    searchNotes: builder.mutation<Note[], string>({
      query: (search) => ({
        url: `/notes?search=${search}`,
        method: 'GET'
      })
    }),
  })
})

export const {
  useFetchNotesQuery,
  useFetchNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
  useRemoveMultiNotesMutation,
  useSearchNotesMutation
} = notesApi;
