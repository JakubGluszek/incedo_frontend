import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface User {
  username: string,
  email: string,
  avatar: string,
  is_super: boolean
}

export interface AccountState {
  user: User | undefined | null
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

export interface NotesUpdateRank {
  type: NotesFileType
  id: number,
  rank: number,
  parent_id?: number | null,
}

export interface RemoveMulti {
  [x: string]: number[]
}

export type NotesFileType = 'folder' | 'note' | string

export type CustomData = {
  type: NotesFileType
}
