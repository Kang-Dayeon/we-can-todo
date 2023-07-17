// ** RTK **
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
// ** Redux **
import {PURGE} from "redux-persist";
// ** Type **
import {AuthState, ILogin, ISignUp} from "./type";
// ** Data **
import {users} from "../../database/users";

// 기본값
const initialState: AuthState = {
    userList: users,
    isLogin: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<ILogin>) => {
            if(!state.userList.some(user => user.loginId === action.payload.loginId)){
                alert("아이디가 일치하지 않습니다")
            } else if(!state.userList.some(user => user.password === action.payload.password)){
                alert("비밀번호가 일치하지 않습니다")
            } else {
                state.loginUser = state.userList.find(user => user.loginId === action.payload.loginId)
            }
            if(state.loginUser !== undefined){
                state.isLogin = true
            }
        },
        logout: (state) => {
            state.isLogin = false
        },
        signup: (state, action: PayloadAction<ISignUp>) => {
            state.userList.push({
                id: (state.userList.length === 0) ? 1 : Math.max(...state.userList.map(user => user.id)) + 1,
                name: action.payload.name,
                loginId: action.payload.loginId,
                password: action.payload.password,
                todos: []
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const {login,logout,signup} = AuthSlice.actions
export default AuthSlice.reducer;
