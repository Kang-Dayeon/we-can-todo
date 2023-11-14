import {ITodo} from "../todos/type";

export interface IUser {
    id?: number;
    name?: string;
    loginId: string;
    password: string;
    todos?: ITodo[];
}

export interface AuthState {
    userList: IUser[];
    loginUser?: IUser;
    isLogin: boolean;
}