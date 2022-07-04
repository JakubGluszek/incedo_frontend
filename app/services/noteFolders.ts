import { api } from './api';
import { NoteFolder, UpdateRank, RemoveMulti } from '../../types';

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
        url: '/note_folders',
        // TODO - handle query params
      })
    }),
    fetchNoteFolderById: builder.query<NoteFolder, number | string>({
      query: id => `/note_folders/${id}`
    }),
    createNoteFolder: builder.mutation<NoteFolder, NoteFolderCreate>({
      query: note_folder => ({
        url: '/note_folders',
        method: 'POST',
        body: note_folder
      })
    }),
    updateNoteFolder: builder.mutation<NoteFolder, NoteFolderUpdate>({
      query: update => ({
        url: `/note_folders/${update.id}`,
        method: 'PUT',
        body: update
      })
    }),
    removeNoteFolder: builder.query<any, number>({
      query: id => ({
        url: `/note_folders/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (r, meta, arg) => arg
    }),
    removeMultiNoteFolders: builder.mutation<any, RemoveMulti>({
      query: payload => ({
        url: '/note_folders',
        method: 'DELETE',
        body: payload
      }),
      transformResponse: (r, meta, arg) => arg.note_folders_ids
    }),
    updateNoteFolderRank: builder.mutation<any, UpdateRank>({
      query: update => ({
        url: '/note_folders/ranks',
        method: 'POST',
        body: update
      })
    })
  })
})

export const {
  useFetchNoteFoldersQuery,
  useFetchNoteFolderByIdQuery,
  useCreateNoteFolderMutation,
  useUpdateNoteFolderMutation,
  useRemoveNoteFolderQuery,
  useRemoveMultiNoteFoldersMutation,
  useUpdateNoteFolderRankMutation
} = noteFoldersApi;
