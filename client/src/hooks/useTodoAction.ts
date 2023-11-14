import {useCallback} from "react";
import {toggleTodo, removeTodo} from "../store/todos/todoSlice";
import {useAppDispatch} from "./TypedUseSelector";

export default function useTodoAction(id: number){
    const dispatch = useAppDispatch()

    const onToggle = useCallback(() => dispatch(toggleTodo(id)), [dispatch, id]);
    const onRemove = useCallback(() => dispatch(removeTodo(id)), [dispatch, id]);

    return { onToggle, onRemove }
}