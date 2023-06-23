import React from 'react';
import TodoInsert from "./pages/TodoInsert";
import TodoList from "./pages/TodoList";
import LayoutWrapper from "./layout/LayoutWrapper";
import Header from "./layout/header";

function App() {
  return (
    <LayoutWrapper>
        <Header></Header>
      <TodoInsert/>
      <TodoList/>
    </LayoutWrapper>
  );
}

export default App;
