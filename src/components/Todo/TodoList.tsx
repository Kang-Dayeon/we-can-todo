import React from "react";
// import {useSelector} from "react-redux";
// import {RootReducer} from "../../store/rootReducer";
import TodoItem from "./TodoItem";
import ListBox from "../../components/Listbox";
import {ITodo} from "../../store/todos/type";
import {useAppSelector} from "../../hooks/TypedUseSelector";
import NoContent from "./NoContent";

function TodoList(){
    const todos = useAppSelector((state) => state.todos);

    // if(todos.length === 0) return <p>등록된 항목이 없습니다.</p>

    return (
        <>
            <ListBox title={'TODO'}>
                {todos.length === 0 ?
                    <NoContent/> :
                    <ul>
                        {todos.map((todo: ITodo) => (
                            todo.completed ? '' : <TodoItem {...todo} />
                        ))}
                    </ul>
                }
            </ListBox>
            <ListBox title={'COMPLETED'}>
                {todos.length === 0 ?
                    <NoContent/> :
                    <ul>
                        {todos.map((todo: ITodo) => (
                            todo.completed ? <TodoItem {...todo} /> : ''
                        ))}
                    </ul>
                }
            </ListBox>
        </>
    );
}

export default TodoList;