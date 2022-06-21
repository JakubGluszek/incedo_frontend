import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';

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
  reducers: {
    updateRanks: (state: EntityState<IStateNotebook>, action: { payload: DropResult }) => {
      // update notebook at destination index with source notebook's rank
      for (const [key, value] of Object.entries(state.entities)) {
        if (value?.rank === action.payload.destination?.index) {
          value!.rank = action.payload.source.index
        }
      }
      // update source notebook rank with destination index
      let notebook_id = parseInt(action.payload.draggableId.split('-')[1])
      state.entities[notebook_id]!.rank = action.payload.destination?.index!
    }
  },
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
  }
})

export default notebooksSlice.reducer;

export const notebooksActions = notebooksSlice.actions;

export const {
  selectById: selectNotebookById,
  selectIds: selectNotebookIds,
  selectEntities: selectNotebookEntities,
  selectAll: selectAllNotebooks,
  selectTotal: selectTotalNotebooks,
} = notebooksAdapter.getSelectors((state: RootState) => state.notebooks)
