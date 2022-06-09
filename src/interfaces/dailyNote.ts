export interface IStateDailyNote {
  value: IDailyNote | null,
}

export interface IDailyNote {
  body: string,
  date: number
}

export interface IDailyNoteCreate {
  body: string
}

export interface IDailyNoteUpdate {
  body: string
}
