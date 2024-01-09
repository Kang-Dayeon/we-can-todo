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
        builder
            // todo list 불러오기
            // 통신 성공
            .addCase(__getTodoList.fulfilled, (state, action) => {
                state.todoList = action.payload
            })
            //통신에러
            .addCase(__getTodoList.rejected, (state, action) => {
                console.log(action.payload)
            })
            // todo 추가
            .addCase(__addTodo.fulfilled, (state, action) => {
                state.todoList.push(action.payload)
            })
            // todo 수정
            .addCase(__editTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter((todo) => todo.TodoID !== action.payload.TodoID)
                state.todoList = [
                    ...state.todoList,
                    action.payload
                ]
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

// 투두리스트 수정
export const __editTodo = createAsyncThunk<
    ITodo,
    ITodo,
    {rejectValue: AxiosResponseError}
    >('todo/editTodo', async (arg, thunkAPI) => {
    try {
        return axios.post("/todo/edit-todo", arg).then((res) => res.data)
    } catch (err){
        return thunkAPI.rejectWithValue({
            error: 'error'
        })
    }
})

// 투두 삭제
// TODO:좀 덜컹거리는 부분이 있음
export const __removeTodo = createAsyncThunk<
    ITodo[],
    ITodo,
    {rejectValue: AxiosResponseError}
    >('todo/removeTodo', async (arg, thunkAPI) => {
    try {
        await axios.post("/todo/remove-todo", arg)
    } catch (err){
        return thunkAPI.rejectWithValue({
            error: 'error'
        })
    }
})

// 투두 토글
export const __toggleTodo = createAsyncThunk<
    ITodo[],
    ITodo,
    {rejectValue: AxiosResponseError}
    >('todo/toggleTodo', async (arg, thunkAPI) => {
    try {
        await axios.post("/todo/toggle-todo", arg)
    } catch (err){
        return thunkAPI.rejectWithValue({
            error: 'error'
        })
    }
})

// 투두리스트 불러오기
export const __getTodoList = createAsyncThunk<
    ITodo[],
    userInput,
    {rejectValue: AxiosResponseError}
    >('todo/getTodolist', async (arg,thunkAPI) => {
        try {
            const response = await axios.post("/todo/todolist", arg);
            return response.data as ITodo[]; // 타입 캐스팅 추가
        } catch(err) {
            return thunkAPI.rejectWithValue({
                error: 'error'
            })
        }
    }
)
