import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "./type";

// 초기값 설정
const initialState: ITodo[] = []

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo[]>) => {
            state.push(...action.payload)
            console.log(state)
        },
        // toggleTodo: (state, action: PayloadAction<number>) => {
        //     return state.map(todo => (todo.id === action.payload ? {...todo, completed: !todo.completed} : todo))
        // },
        // removeTodo: (state, action: PayloadAction<number>) => {
        //     return state.filter(todo => todo.id !== action.payload)
        // }
    }
})

// export const {addTodo,toggleTodo,removeTodo} = TodosSlice.actions
export const {addTodo} = TodosSlice.actions
export default TodosSlice.reducer;
