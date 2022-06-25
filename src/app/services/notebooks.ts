import { api } from './api';
import {
  IFetchById,
  INotebookCreate,
  IStateNotebook,
  INotebookUpdateRank,
  INote
} from '../../interfaces';

interface NotebookResponse extends IStateNotebook {
  notes: INote[]
};

export const notebooksApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchNotebooks: builder.query<NotebookResponse[], any>({
      query: () => '/notebooks'
    }),
    fetchNotebookById: builder.query<NotebookResponse, IFetchById>({
      query: ({ id }) => `/notebooks/${id}`
    }),
    fetchNotebooksSearch: builder.query<NotebookResponse[], string>({
      query: (search) => ({
        url: `/notebooks?search=${search}`,
        method: 'GET'
      })
    }),
    createNotebook: builder.mutation<NotebookResponse, INotebookCreate>({
      query: (notebook) => ({
        url: '/notebooks',
        method: 'POST',
        body: notebook
      })
    }),
    updateNotebook: builder.mutation<NotebookResponse, IStateNotebook>({
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
      }),
      transformResponse: (response, meta, arg) => {
        return (arg)
      }
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
  useFetchNotebooksSearchQuery,
  useCreateNotebookMutation,
  useUpdateNotebookMutation,
  useDeleteNotebookMutation,
  useUpdateNotebooksRanksMutation
} = notebooksApi;
