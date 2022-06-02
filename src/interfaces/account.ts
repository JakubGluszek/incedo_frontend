export interface IGetToken {
  email: string
}

export interface ISignIn {
  token: string
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  avatar: string,
  is_super: boolean
}

export interface IStateAccount {
  user: IUser | null
}
