import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { notebooksApi } from "../../app/services/notebooks";
import { notesApi } from "../../app/services/notes";
import { INote } from "../../interfaces";
import { RootState } from "../../app/store";


export const notesAdapter = createEntityAdapter<INote>()
// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = notesAdapter.getInitialState()

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      notebooksApi.endpoints.fetchNotebooks.matchFulfilled,
      (state, { payload }) => {
        payload.map(notebook => notesAdapter.setMany(state, notebook.notes))
      }
    )
    builder.addMatcher(
      notebooksApi.endpoints.fetchNotebookById.matchFulfilled,
      (state, { payload }) => notesAdapter.setMany(state, payload.notes)
    )
    builder.addMatcher(
      notesApi.endpoints.fetchNoteById.matchFulfilled,
      notesAdapter.setOne
    )
    builder.addMatcher(
      notesApi.endpoints.fetchNotes.matchFulfilled,
      notesAdapter.setMany
    )
    builder.addMatcher(
      notesApi.endpoints.createNote.matchFulfilled,
      notesAdapter.addOne
    )
    builder.addMatcher(
      notesApi.endpoints.updateNote.matchFulfilled,
      notesAdapter.upsertOne
    )
  }
})

export default notesSlice.reducer;

export const {
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  selectEntities: selectNoteEntities,
  selectAll: selectAllNotes,
  selectTotal: selectTotalNotes,
} = notesAdapter.getSelectors((state: RootState) => state.notes)

export const selectNotesByNotebookId = (state: RootState, id: number) => selectAllNotes(state).filter(note => note.notebook_id === id)
