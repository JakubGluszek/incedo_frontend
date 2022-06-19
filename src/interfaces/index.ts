export type {
  IStateAccount, IUser, ILogin, IFetchToken
} from '../features/account/interfaces';
export type {
  INotebook, INotebookCreate, INotebookUpdate, IStateNotebook
} from '../features/notebooks/interfaces';
export type {
  INote, INoteCreate, INoteUpdate
} from '../features/notes/interfaces';

export interface IFetchById {
  id: number
}
