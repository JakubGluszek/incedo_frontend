import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { Note } from '../../types';
import { RootState } from '../../app/store';
import { notesApi } from '../../app/services/notes';

export const notesAdapter = createEntityAdapter<Note>();

const initialState = notesAdapter.getInitialState();

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      notesApi.endpoints.fetchNotes.matchFulfilled,
      notesAdapter.setMany
    )
    builder.addMatcher(
      notesApi.endpoints.fetchNoteById.matchFulfilled,
      notesAdapter.setOne
    )
    builder.addMatcher(
      notesApi.endpoints.createNote.matchFulfilled,
      notesAdapter.addOne
    )
    builder.addMatcher(
      notesApi.endpoints.updateNote.matchFulfilled,
      notesAdapter.setOne
    )
    builder.addMatcher(
      notesApi.endpoints.removeNote.matchFulfilled,
      notesAdapter.removeOne
    )
    builder.addMatcher(
      notesApi.endpoints.removeMultiNotes.matchFulfilled,
      notesAdapter.removeMany
    )
  }
})

export default notesSlice.reducer;

export const notesActions = notesSlice.actions;

export const {
  selectAll: selectAllNotes,
  selectTotal: selectTotalNotes,
  selectIds: selectNotesIds,
  selectEntities: selectNotesEntities,
  selectById: selectNoteById
} = notesAdapter.getSelectors((state: RootState) => state.notes);
