import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IStateDailyNote } from "../../interfaces";

const initialState: IStateDailyNote = {
  value: null
}

const dailyNoteSlice = createSlice({
  name: 'dailyNote',
  initialState,
  reducers: {},
  extraReducers: builder => [
    
  ]
})

export default dailyNoteSlice.reducer;

export const selectDailyNote = (state: RootState) => state.dailyNote.value;
