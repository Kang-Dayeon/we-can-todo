// ** RTK **
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// ** Redux **
import {PURGE} from "redux-persist";
// ** Type **
import {IUser} from "./type";
import axios from "axios";

// 기본값
const initialState: IUser = {
    name: '',
    username: '',
    isLogin: false,
    isRegister: false,
    failLogin: ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogin = false
        },
        setFailLogin: (state) => {
            state.failLogin = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState)
        // 통신중
        builder.addCase(__login.pending, (state) => {
            state.isLogin = false
        })
        // 통신 성공
            .addCase(__login.fulfilled, (state, action) => {
                if(action.payload.isLogin){
                    state.isLogin = action.payload.isLogin
                    state.userID = action.payload.userID
                    state.username = action.payload.username
                    state.name = action.payload.name
                    console.log(action.payload.isLogin)
                    console.log(state.isLogin)
                } else {
                    state.failLogin = action.payload.failLogin
                }
            })
        //통신에러
            .addCase(__login.rejected, (state) => {
                state.isLogin = false
            })
        // 통신중
        builder.addCase(__register.pending, (state) => {
            state.isRegister = false
        })
            // 통신 성공
            .addCase(__register.fulfilled, (state, action) => {
                state.isRegister = action.payload.isRegister
            })
            //통신에러
            .addCase(__register.rejected, (state) => {
                state.isRegister = false
            })
    }
})

export const {logout, setFailLogin} = AuthSlice.actions
export default AuthSlice.reducer;

// axios
export interface UserInput {
    name?: string,
    username: string,
    password: string
}

export interface AxiosResponseError {
    error: string
}

export const __login = createAsyncThunk<
    IUser,
    UserInput,
    {rejectValue: AxiosResponseError}
    >('auth/getLogin', async (arg, thunkAPI) => {
        try {
            return axios.post("/auth/login", arg).then((res) => res.data)
        } catch(err) {
            return thunkAPI.rejectWithValue({
                error: 'error'
            })
        }
    }
)

export const __register = createAsyncThunk<
    IUser,
    UserInput,
    {rejectValue: AxiosResponseError}
    >('auth/register',async (arg, thunkAPI) => {
        try {
            return axios.post("auth/register", arg).then((res) => res.data)
        } catch (err) {
            return thunkAPI.rejectWithValue({
                error: 'error'
            })
        }
})
