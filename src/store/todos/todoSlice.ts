import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {TodosType} from "./type";

// 초기값 설정
const initialState: TodosType = [
    {id: 1, text: '타입스크립트 배우기', completed: true},
    {id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', completed: true},
    {id: 3, text: '투두리스트 만들기', completed: false},
];

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>){
            state.concat([{
                id: Math.max(...state.map(todo => todo.id)) + 1,
                text: action.payload,
                completed: false
            }])
        },
        toggleTodo(state, action: PayloadAction<number>){
            state.map(todo => (todo.id === action.payload ? {...todo, completed: !todo.completed} : todo))
        },
        removeTodo(state, action: PayloadAction<number>){
            state.filter(todo => todo.id !== action.payload)
        }
    }
})

export const {addTodo,toggleTodo,removeTodo} = TodosSlice.actions
export default TodosSlice.reducer;
