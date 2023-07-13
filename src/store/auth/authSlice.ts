import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {AuthState, ILogin} from "./type";
import {users} from "../../database/users";
import {PURGE} from "redux-persist";

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const {login,logout} = AuthSlice.actions
export default AuthSlice.reducer;
