import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { notebooksApi } from '../../app/services/notebooks';
import { RootState } from '../../app/store';
import { IStateNotebook } from './interfaces';


export const notebooksAdapter = createEntityAdapter<IStateNotebook>()
// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = notebooksAdapter.getInitialState()

const notebooksSlice = createSlice({
  name: 'notebooks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      notebooksApi.endpoints.fetchNotebooks.matchFulfilled,
      notebooksAdapter.upsertMany
    )
    builder.addMatcher(
      notebooksApi.endpoints.fetchNotebookById.matchFulfilled,
      notebooksAdapter.setOne
    )
    builder.addMatcher(
      notebooksApi.endpoints.createNotebook.matchFulfilled,
      notebooksAdapter.addOne
    )
    builder.addMatcher(
      notebooksApi.endpoints.updateNotebook.matchFulfilled,
      notebooksAdapter.upsertOne
    )
    builder.addMatcher(
      notebooksApi.endpoints.deleteNotebook.matchFulfilled,
      notebooksAdapter.removeOne
    )
    builder.addMatcher(
      notebooksApi.endpoints.updateNotebooksRanks.matchFulfilled,
      notebooksAdapter.upsertMany
    )
  }
})

export default notebooksSlice.reducer;

export const {
  selectById: selectNotebookById,
  selectIds: selectNotebookIds,
  selectEntities: selectNotebookEntities,
  selectAll: selectAllNotebooks,
  selectTotal: selectTotalNotebooks,
} = notebooksAdapter.getSelectors((state: RootState) => state.notebooks)
