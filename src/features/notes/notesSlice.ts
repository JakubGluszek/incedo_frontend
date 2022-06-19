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
      notesApi.endpoints.fetchNoteById.matchFulfilled,
      notesAdapter.setOne
    )
    builder.addMatcher(
      notebooksApi.endpoints.fetchNotebooks.matchFulfilled,
      (state, { payload }) => {
        payload.map(notebook => notesAdapter.upsertMany(state, notebook.notes))
      }
    )
    builder.addMatcher(
      notebooksApi.endpoints.fetchNotebookById.matchFulfilled,
      (state, { payload }) => notesAdapter.setMany(state, payload.notes)
    )
    // builder.addMatcher(
    //   accountApi.endpoints.fetchAccount.matchFulfilled,
    //   (state, { payload }) => {
    //     state.user = payload
    //   }
    // ),
    // builder.addMatcher(
    //   accountApi.endpoints.login.matchFulfilled,
    //   (state, { payload }) => {
    //     state.user = payload
    //   }
    // ),
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
