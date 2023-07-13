import React from "react";
// ** Type **
import {ITodo} from "../../store/todos/type";
// ** Hook **
import {useAppSelector} from "../../hooks/TypedUseSelector";
// ** Component **
import TodoItem from "./TodoItem";
import List from "../List/List";
import NoContent from "./NoContent";

function TodoList(){
    // state
    const todos = useAppSelector((state) => state.todos);

    return (
        <>
            <List title={'TODO'}>
                {todos.length === 0 ?
                    <NoContent/> :
                    <ul>
                        {todos.map((todo: ITodo) => (
                            todo.completed ? '' : <TodoItem {...todo} />
                        ))}
                    </ul>
                }
            </List>
            <List title={'COMPLETED'}>
                {todos.length === 0 ?
                    <NoContent/> :
                    <ul>
                        {todos.map((todo: ITodo) => (
                            todo.completed ? <TodoItem {...todo} /> : ''
                        ))}
                    </ul>
                }
            </List>
        </>
    );
}

export default TodoList;