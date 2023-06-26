// ** typesafe-actions **
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

// 상태를 위한 타입 선언
export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export type TodosState = Todo[];