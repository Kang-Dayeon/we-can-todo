import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "./type";

// 초기값 설정
const initialState: ITodo[] = []

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.push({
                id: (state.length === 0) ? 1 : Math.max(...state.map(todo => todo.id)) + 1,
                text: action.payload,
                completed: false
            })
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            return state.map(todo => (todo.id === action.payload ? {...todo, completed: !todo.completed} : todo))
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            return state.filter(todo => todo.id !== action.payload)
        }
    }
})

export const {addTodo,toggleTodo,removeTodo} = TodosSlice.actions
export default TodosSlice.reducer;
