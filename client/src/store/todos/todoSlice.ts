import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ITodoList,ITodo} from "./type";
import axios from "axios";

// 초기값 설정
const initialState: ITodoList = {
    todoList: []
}

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // 통신중
        builder.addCase(__getTodoList.pending, (state) => {
            state.todoList = []
        })
            // 통신 성공
            .addCase(__getTodoList.fulfilled, (state, action) => {
                state.todoList = action.payload
            })
            //통신에러
            .addCase(__getTodoList.rejected, (state, action) => {
                console.log(action.payload)
            })
        builder.addCase(__addTodo.pending, (state) => {
            console.log(state.todoList)
        })
            .addCase(__addTodo.fulfilled, (state, action) => {
                state.todoList.push(action.payload)
            })
            .addCase(__addTodo.rejected, (state, action) => {
                console.log(action.payload)
            })
    }
})

export default TodosSlice.reducer;
// axios
export interface userInput {
    userID: number
}

export interface AxiosResponseError {
    error: string
}

// 투두리스트 불러오기
export const __getTodoList = createAsyncThunk<
    ITodo[],
    userInput,
    {rejectValue: AxiosResponseError}
    >('todo/getTodolist', async (arg,thunkAPI) => {
        try {
            return axios.post("/todo/todolist", arg).then((res) => res.data)
        } catch(err) {
            return thunkAPI.rejectWithValue({
                error: 'error'
            })
        }
    }
)

// 투두리스트 추가
export const __addTodo = createAsyncThunk<
    ITodo,
    ITodo,
    {rejectValue: AxiosResponseError}
    >('todo/addTodo', async (arg, thunkAPI) => {
        try {
            return axios.post("/todo/add-todo", arg).then((res) => res.data)
        } catch (err){
            return thunkAPI.rejectWithValue({
                error: 'error'
            })
        }
})

// 투두 삭제
// TODO:좀 덜컹거리는 부분이 있음
export const __removeTodo = createAsyncThunk<
    ITodo,
    ITodo,
    {rejectValue: AxiosResponseError}
    >('todo/removeTodo', async (arg, thunkAPI) => {
    try {
        axios.post("/todo/remove-todo", arg).then()
    } catch (err){
        return thunkAPI.rejectWithValue({
            error: 'error'
        })
    }
})

export const __toggleTodo = createAsyncThunk<
    ITodo,
    ITodo,
    {rejectValue: AxiosResponseError}
    >('todo/toggleTodo', async (arg, thunkAPI) => {
    try {
        axios.post("/todo/toggle-todo", arg).then()
    } catch (err){
        return thunkAPI.rejectWithValue({
            error: 'error'
        })
    }
})
