import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./type";
import {users} from "../../database/users";

const initialState:AuthState = {
    userList: users,
    loginUser: null,
    isLogin: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>){

        },
    }
})

export const {login} = AuthSlice.actions
export default AuthSlice.reducer;
