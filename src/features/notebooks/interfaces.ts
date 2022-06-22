import { INote } from '../notes/interfaces';

export interface IStateNotebook {
  id: number,
  label: string,
  rank: number,
  about: string | null,
  created_at: number,
  edited_at: number
};

export interface INotebookCreate {
  label?: string,
  about?: string
};

export interface INotebookUpdateRank {
  id: number,
  rank: number
};
