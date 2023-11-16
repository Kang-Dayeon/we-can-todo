// import {useDispatch} from "react-redux";
import {useCallback} from "react";
// import {addTodo} from "../store/todos/todoSlice";
import {useAppDispatch} from "./TypedUseSelector";

export default function useAddTodo(){
    const dispatch = useAppDispatch();
    // return useCallback((text: any) => dispatch(addTodo(text)), [dispatch]);
}