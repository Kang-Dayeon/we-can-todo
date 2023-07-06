import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import TodoItem from "./TodoItem";
import ListBox from "../../components/Listbox";

function TodoList(){
    const todos = useSelector((state: RootState) => state.todos);

    if(todos.length === 0) return <p>등록된 항목이 없습니다.</p>

    return (
        <>
            <ListBox title={'TODO'}>
                <ul>
                    {todos.map(todo => (
                        todo.completed ? '' : <TodoItem {...todo} />
                    ))}
                </ul>
            </ListBox>
            <ListBox title={'COMPLETED'}>
                <ul>
                    {todos.map(todo => (
                        todo.completed ? <TodoItem {...todo} /> : ''
                    ))}
                </ul>
            </ListBox>
        </>
    );
}

export default TodoList;