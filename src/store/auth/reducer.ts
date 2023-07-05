import {createReducer} from "typesafe-actions";
import {users} from '../../database/users';
import {AuthAction, UserType, User} from "./types";
import {LOGIN} from "./actions";

type initialType = {
    userList: UserType,
    loginUser: User | null,
    isLogin: boolean
}

const userList: UserType = [
    users,
]

// 초기값 설정
const initialState:initialType  = {
    userList,
    loginUser: null,
    isLogin: false,
};

// createReducer 로 리듀서 구현하기
const auth = createReducer<initialType, AuthAction>(initialState, {
    [LOGIN]: (state, {payload: loginId}) =>
        state.userList.find(user => user.loginId === loginId),
});

export default auth;
