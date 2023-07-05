import React from "react";
import TodoItem from "./TodoItem";
import useTodos from "../hooks/useTodos";
import ListBox from "../components/Listbox";

function TodoList(){
    const todos = useTodos();

    if(todos.length === 0) return <p>등록된 항목이 없습니다.</p>

    return (
        <>
            <ListBox title={'TODO'}>
                <ul>
                    {todos.map(todo => (
                        todo.completed ? '' : <TodoItem todoItem={todo} key={todo.id} />
                    ))}
                </ul>
            </ListBox>
            <ListBox title={'COMPLETED'}>
                <ul>
                    {todos.map(todo => (
                        todo.completed ? <TodoItem todoItem={todo} key={todo.id} /> : ''
                    ))}
                </ul>
            </ListBox>
        </>
    );
}

export default TodoList;