import { api } from './api';
import { NoteFolder, RemoveMulti } from '../../types';

interface NoteFolderCreate {
  label: string,
  parent_id?: number | null
}

interface NoteFolderUpdate {
  id: number,
  label?: string,
  parent_id?: number | null
}

export const noteFoldersApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchNoteFolders: builder.query<NoteFolder[], any>({
      query: () => ({
        url: '/notes/folders',
        // TODO - handle query params
      })
    }),
    fetchNoteFolderById: builder.query<NoteFolder, number | string>({
      query: id => `/notes/folders/${id}`
    }),
    createNoteFolder: builder.mutation<NoteFolder, NoteFolderCreate>({
      query: note_folder => ({
        url: '/notes/folders',
        method: 'POST',
        body: note_folder
      })
    }),
    updateNoteFolder: builder.mutation<NoteFolder, NoteFolderUpdate>({
      query: update => ({
        url: `/notes/folders/${update.id}`,
        method: 'PUT',
        body: update
      })
    }),
    removeNoteFolder: builder.query<any, number>({
      query: id => ({
        url: `/notes/folders/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (r, meta, arg) => arg
    }),
    removeMultiNoteFolders: builder.mutation<any, RemoveMulti>({
      query: payload => ({
        url: '/notes/folders',
        method: 'DELETE',
        body: payload
      }),
      transformResponse: (r, meta, arg) => arg.note_folders_ids
    }),
  })
})

export const {
  useFetchNoteFoldersQuery,
  useFetchNoteFolderByIdQuery,
  useCreateNoteFolderMutation,
  useUpdateNoteFolderMutation,
  useRemoveNoteFolderQuery,
  useRemoveMultiNoteFoldersMutation,
} = noteFoldersApi;
