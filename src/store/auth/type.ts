import {TodosType} from "../todos/type";

export interface IUser {
    id: number,
    name: string,
    loginId: string,
    password: string,
    todos: TodosType
}

export type userListType = IUser[]

export interface AuthState {
    userList: userListType,
    loginUser?: IUser,
    isLogin: boolean,
}

export interface ILogin {
    loginId: string,
    password: string
}

export interface ISignUp {
    name: string,
    loginId: string,
    password: string
}