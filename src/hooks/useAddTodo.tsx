import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {addTodo} from "../store/todos/todoSlice";

export default function useAddTodo(){
    const dispatch = useDispatch();
    return useCallback((text: any) => dispatch(addTodo(text)), [dispatch]);
}