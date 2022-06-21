import { api } from './api';
import {
  IFetchById,
  INotebook,
  INotebookCreate,
  IStateNotebook,
  INotebookUpdateRank
} from '../../interfaces';

export const notebooksApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchNotebooks: builder.query<INotebook[], any>({
      query: () => '/notebooks'
    }),
    fetchNotebookById: builder.query<INotebook, IFetchById>({
      query: ({ id }) => `/notebooks/${id}`
    }),
    createNotebook: builder.mutation<INotebook, INotebookCreate>({
      query: (notebook) => ({
        url: '/notebooks',
        method: 'POST',
        body: notebook
      })
    }),
    updateNotebook: builder.mutation<INotebook, IStateNotebook>({
      query: (notebook) => ({
        url: `/notebooks/${notebook.id}`,
        method: 'PUT',
        body: notebook
      })
    }),
    deleteNotebook: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notebooks/${id}`,
        method: 'DELETE'
      })
    }),
    updateNotebooksRanks: builder.mutation<IStateNotebook[], INotebookUpdateRank>({
      query: (update) => ({
        url: '/notebooks/ranks',
        method: 'POST',
        body: update
      })
    })
  })
})

export const {
  useFetchNotebooksQuery,
  useFetchNotebookByIdQuery,
  useCreateNotebookMutation,
  useUpdateNotebookMutation,
  useDeleteNotebookMutation,
  useUpdateNotebooksRanksMutation
} = notebooksApi;
