import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {ITodoList,ITodo} from "./type";
import axios from "axios";

// 초기값 설정
const initialState: ITodoList = {
    todoList: []
}

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // addTodo: (state, action: PayloadAction<ITodo[]>) => {
        //     state.push(...action.payload)
        // },
        // toggleTodo: (state, action: PayloadAction<number>) => {
        //     return state.map(todo => (todo.id === action.payload ? {...todo, completed: !todo.completed} : todo))
        // },
        // removeTodo: (state, action: PayloadAction<number>) => {
        //     return state.filter(todo => todo.id !== action.payload)
        // }
    },
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
                console.log(action.payload)
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
