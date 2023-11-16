// ** RTK **
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
// ** Redux **
import {PURGE} from "redux-persist";
// ** Type **
import {IUser} from "./type";
import axios from "axios";

// 기본값
const initialState: IUser = {
    name: '',
    isLogin: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login: (state, action: PayloadAction<IUser>) => {
        //     if(action.payload.isLogin){
        //         state.isLogin = true
        //         state.name = action.payload.name
        //     }
        // },
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
        builder.addCase(PURGE, () => initialState)
        // 통신중
        builder.addCase(__getLogin.pending, (state) => {
            state.isLogin = false
        })
        // 통신 성공
            .addCase(__getLogin.fulfilled, (state, action) => {
                state.isLogin = true
                state.userId = action.payload.userId
                state.name = action.payload.name
            })
        //통신에러
            .addCase(__getLogin.rejected, (state) => {
                state.isLogin = false
            })
    }
})

export const {logout} = AuthSlice.actions
export default AuthSlice.reducer;

// axios
export interface UserFetchResult {
    userId: number | null,
    name: string | null,
    isLogin: boolean | null
}

export interface UserInput {
    loginId: string,
    password: string
}

export interface AxiosResponseError {
    error: string
}

export const __getLogin = createAsyncThunk<
    UserFetchResult,
    UserInput,
    {rejectValue: AxiosResponseError}
    >('auth/getLogin', async (arg, thunkAPI) => {
        try {
            return axios.post("/api/login", arg).then((res) => res.data)
        } catch(err) {
            return thunkAPI.rejectWithValue({
                error: 'error'
            })
        }
    }
)
