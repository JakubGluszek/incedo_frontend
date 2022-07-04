export interface User {
  username: string,
  email: string,
  avatar: string,
  is_super: boolean
}

export interface AccountState {
  user: null | User
}

export interface NoteFolder {
  id: number,
  label: string,
  rank: number,
  created_at: number,
  edited_at: number,
  parent_id: number | null
}

export interface Note {
  id: number,
  label: string,
  body: string,
  rank: number,
  created_at: number,
  edited_at: number,
  note_folder_id: number | null
}

export interface UpdateRank {
  id: number,
  rank: number
}

export interface RemoveMulti {
  [x: string]: number[]
}
