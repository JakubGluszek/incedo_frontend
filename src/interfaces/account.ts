export interface IFetchToken {
  email: string
}

export interface ILogin {
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
