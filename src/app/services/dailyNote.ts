import { IDailyNote, IDailyNoteCreate, IDailyNoteUpdate } from "../../interfaces"
import { api } from "./api"

export const dailyNoteApi = api.injectEndpoints({
  endpoints: builder => ({
    getDailyNote: builder.query<IDailyNote, any>({
      query: () => '/daily_notes/today'
    }),
    getDailyNoteHistory: builder.query({
      query: () => '/daily_notes'
    }),
    createDailyNote: builder.mutation<IDailyNote, IDailyNoteCreate>({
      query: (data) => ({
        url: '/daily_notes',
        method: 'POST',
        body: { ...data }
      })
    }),
    updateDailyNote: builder.mutation<IDailyNote, IDailyNoteUpdate>({
      query: (data) => ({
        url: '/daily_notes/today',
        method: 'PUT',
        body: { ...data }
      })
    })
  })
})

export const {
  useGetDailyNoteQuery,
  useGetDailyNoteHistoryQuery,
  useCreateDailyNoteMutation,
  useUpdateDailyNoteMutation
} = dailyNoteApi;
