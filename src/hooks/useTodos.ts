import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export default function useTodos(){
    const todos = useSelector((state: RootState) => state.todos); // 상태 조회
    return todos;
}