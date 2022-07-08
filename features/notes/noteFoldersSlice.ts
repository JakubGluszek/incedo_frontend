import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';

import { NoteFolder, NotesUpdateRank } from '../../types';
import { RootState } from '../../app/store';
import { noteFoldersApi } from '../../app/services/noteFolders';

export const noteFoldersAdapter = createEntityAdapter<NoteFolder>();

const initialState = noteFoldersAdapter.getInitialState();

const noteFoldersSlice = createSlice({
  name: 'noteFolders',
  initialState,
  reducers: {
    updateRank: (state: EntityState<NoteFolder>, action: { payload: NotesUpdateRank }) => {
      // 'optimistic' rank update
      return
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      noteFoldersApi.endpoints.fetchNoteFolders.matchFulfilled,
      noteFoldersAdapter.setMany
    )
    builder.addMatcher(
      noteFoldersApi.endpoints.fetchNoteFolderById.matchFulfilled,
      noteFoldersAdapter.setOne
    )
    builder.addMatcher(
      noteFoldersApi.endpoints.createNoteFolder.matchFulfilled,
      noteFoldersAdapter.addOne
    )
    builder.addMatcher(
      noteFoldersApi.endpoints.updateNoteFolder.matchFulfilled,
      noteFoldersAdapter.setOne
    )
    builder.addMatcher(
      noteFoldersApi.endpoints.removeNoteFolder.matchFulfilled,
      noteFoldersAdapter.removeOne
    )
    builder.addMatcher(
      noteFoldersApi.endpoints.removeMultiNoteFolders.matchFulfilled,
      noteFoldersAdapter.removeMany
    )
  }
});

export default noteFoldersSlice.reducer;

export const noteFoldersActions = noteFoldersSlice.actions;

export const {
  selectAll: selectAllNoteFolders,
  selectTotal: selectTotalNoteFolders,
  selectIds: selectNoteFoldersIds,
  selectEntities: selectNoteFoldersEntities,
  selectById: selectNoteFolderById
} = noteFoldersAdapter.getSelectors((state: RootState) => state.noteFolders);
