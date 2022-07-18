import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = any> = NextPage<P> & {
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

export interface Note {
  id: number,
  label: string,
  body: string,
  created_at: number,
  edited_at: number,
}

export interface RemoveMulti {
  [x: string]: number[]
}
