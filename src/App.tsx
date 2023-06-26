import React from 'react';
import TodoInsert from "./pages/TodoInsert";
import TodoList from "./pages/TodoList";
import LayoutWrapper from "./layout/LayoutWrapper";
import Header from "./layout/Header";
import Content from "./layout/Content";

function App() {
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

export default App;
