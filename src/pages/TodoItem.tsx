import React from "react";
import { Todo } from '../modules/todos';
import useTodoAction from "../hooks/useTodoAction";
import styled from "styled-components";

type TodoItemProps = {
    todo: Todo;
};

const IconCheck = require('../assets/images/icon/icon_check.png');

const TodoList = styled.li<{ completed: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 12px 10px;
    border: ${(props) => props.completed ? 'none' : '1px solid rgba(0,0,0,0.2)'};
    border-radius: 15px;
    box-shadow: ${(props) => props.completed ? 'none' : '2px 2px 4px 0 rgba(0,0,0,0.1)'};
`
const ItemWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const CheckBox = styled.input`
    type: checkbox;
    display: none;
`
const CheckLabel = styled.label<{ completed: boolean }>`
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: ${(props) => props.completed ? '1px solid #45BF86' : '1px solid rgba(0,0,0,0.3)'};
    border-radius: 50%;
    background: ${(props) => props.completed ? `url(${IconCheck}) no-repeat center` : 'none'};
    background-color: ${(props) => props.completed ? '#CEF2E1' : '#fff'};
    background-size: 70%;
    transform: translateY(10%);
`
const TodoText = styled.p<{ completed: boolean }>`
    font-size: 12px;
    padding: 0 10px;
    word-break: break-all;
    color: ${(props) => props.completed ? '#999' : '#000'};
    text-decoration: ${(props) => props.completed ? 'line-through' : 'none'} ;
`
const RemoveBtn = styled.button`
    width: 10px;
    border: none;
    color: #999;
    background: transparent;
`


function TodoItem({ todo }: TodoItemProps){
    const { onToggle, onRemove } = useTodoAction(todo.id);

    return (
        <TodoList completed={todo.completed}>
            <ItemWrap>
                <div>
                    <CheckBox id="check"></CheckBox>
                    <CheckLabel htmlFor="check" onClick={onToggle} completed={todo.completed}></CheckLabel>
                </div>
                <TodoText completed={todo.completed}>
                    {todo.text}
                </TodoText>
            </ItemWrap>
            <RemoveBtn onClick={onRemove}>
                X
            </RemoveBtn>
        </TodoList>
    );
}

export default TodoItem;