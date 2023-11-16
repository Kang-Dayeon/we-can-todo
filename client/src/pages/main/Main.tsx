import {useEffect} from 'react';
// ** Hook **
import {useAppSelector} from "../../hooks/TypedUseSelector";
import {useAppDispatch} from "../../hooks/TypedUseSelector";
// ** Component **
import TodoInsert from "./Todo/TodoInsert";
import TodoList from "./Todo/TodoList";
import LayoutWrapper from "../../layout/LayoutWrapper";
import Header from "../../layout/Header";
import Content from "../../layout/Content";
import {useNavigate} from "react-router-dom";
import {__getTodoList} from "../../store/todos/todoSlice";

function Main() {
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const userId = useAppSelector(state => state.auth.userId)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        isLogin ? navigate('/') : navigate('/login')
    },[])

    useEffect(() => {
        if(isLogin){
            dispatch(__getTodoList({userId}))
        }
    }, []);


    return (
        <LayoutWrapper>
            <Header></Header>
            <Content>
                <TodoInsert/>
                <TodoList/>
            </Content>
        </LayoutWrapper>
    );
}

export default Main;
