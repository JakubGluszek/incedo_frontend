import { INotebookCreate } from '../../features/notebooks/interfaces';
import { INotebook, IFetchById } from '../../interfaces';
import { api } from './api'

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
    })
  })
})

export const {
  useFetchNotebooksQuery,
  useFetchNotebookByIdQuery,
  useCreateNotebookMutation
} = notebooksApi;
