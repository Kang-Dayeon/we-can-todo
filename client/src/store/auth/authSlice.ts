// ** RTK **
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
// ** Redux **
import {PURGE} from "redux-persist";
// ** Type **
import {IUser} from "./type";

// 기본값
const initialState: IUser = {
    name: '',
    isLogin: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            if(action.payload.isLogin){
                state.isLogin = true
                state.name = action.payload.name
            }
        },
        logout: (state) => {
            state.isLogin = false
        },
        // signup: (state, action: PayloadAction<IUser>) => {
        //     state.userList.push({
        //         id: (state.userList.length === 0) ? 1 : Math.max(...state.userList.map(user => user.id)) + 1,
        //         name: action.payload.name,
        //         loginId: action.payload.loginId,
        //         password: action.payload.password,
        //         todos: []
        //     })
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const {login,logout} = AuthSlice.actions
export default AuthSlice.reducer;
