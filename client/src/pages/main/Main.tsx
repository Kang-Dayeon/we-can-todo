import {useEffect} from 'react';
// ** Hook **
import {useAppSelector} from "../../hooks/TypedUseSelector";
// ** Component **
import TodoInsert from "./Todo/TodoInsert";
import TodoList from "./Todo/TodoList";
import LayoutWrapper from "../../layout/LayoutWrapper";
import Header from "../../layout/Header";
import Content from "../../layout/Content";
import {useNavigate} from "react-router-dom";

function Main() {
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        isLogin ? navigate('/') : navigate('/login')
    },[])

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
