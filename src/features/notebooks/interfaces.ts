import { INote } from "../notes/interfaces";

export interface IStateNotebook {
  id: number,
  label: string,
  rank: number,
  about: string | null,
}

export interface INotebook {
  id: number,
  label: string,
  rank: number,
  about: string | null,
  notes: INote[]
}

export interface INotebookCreate {
  label?: string,
  about?: string
}
