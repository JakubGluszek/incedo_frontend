export interface User {
  username: string,
  email: string,
  avatar: string,
  is_super: boolean
}

export interface AccountState {
  user: null | User
}
