// ** typesafe-actions **
import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;

// 액션 type
export const ADD_TODO = 'todos/ADD_TODO';
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

// 액션 생성 함수
// createAction 사용시 문법
export const addTodo = createStandardAction(ADD_TODO)<string>();
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();