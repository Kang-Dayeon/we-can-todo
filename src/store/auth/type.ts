export interface IUser {
    id: number,
    name: string,
    loginId: string,
    password: number,
}

export type userListType = IUser[]

export interface AuthState {
    userList: userListType,
    loginUser: IUser | null,
    isLogin: boolean
}