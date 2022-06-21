export type {
  IStateAccount, IUser, ILogin, IFetchToken
} from '../features/account/interfaces';
export type {
  INotebook, INotebookCreate, IStateNotebook, INotebookUpdateRank
} from '../features/notebooks/interfaces';
export type {
  INote, INoteCreate
} from '../features/notes/interfaces';

export interface IFetchById {
  id: number
}
