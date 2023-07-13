import React from 'react';
// ** Component **
import TodoInsert from "../../components/Todo/TodoInsert";
import TodoList from "../../components/Todo/TodoList";
import LayoutWrapper from "../../layout/LayoutWrapper";
import Header from "../../layout/Header";
import Content from "../../layout/Content";

function Main() {
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
