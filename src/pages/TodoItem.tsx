import React from "react";
import { Todo } from '../modules/todos';
import useTodoAction from "../hooks/useTodoAction";
import styled from "styled-components";

type TodoItemProps = {
    todo: Todo;
};

const StyledTodoList = styled.li<{ completed: boolean }>`
    margin: 10px 0;
    padding: 12px 10px;
    color: ${(props) => props.completed ? '#999' : '#000'};
    border: ${(props) => props.completed ? 'none' : '1px solid rgba(0,0,0,0.2)'};
    border-radius: 15px;
    text-decoration: ${(props) => props.completed ? 'line-through' : 'none'} ;
    box-shadow: ${(props) => props.completed ? 'none' : '2px 2px 4px 0 rgba(0,0,0,0.1)'};
`


function TodoItem({ todo }: TodoItemProps){
    const { onToggle, onRemove } = useTodoAction(todo.id);

    return (
        <StyledTodoList completed={todo.completed}>
            <span className="text" onClick={onToggle}>
                {todo.text}
            </span>
            <span className="remove" onClick={onRemove}>
                [X]
            </span>
        </StyledTodoList>
    );
}

export default TodoItem;